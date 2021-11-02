/**
 * ServiceProvider
 */

export type ServiceMap = Record<string, Record<string, (...args: any[]) => any>>;

export class ServiceProvider {
    eventCallbackMap: Record<number, (value: unknown) => void> = {};
    serviceMap: ServiceMap = {};
    constructor(
        private post: (message: unknown) => void,
        listenerAdder: (listener: (event: any) => void) => void,
    ) {
        listenerAdder(this.msgHandler.bind(this));
    }

    msgHandler(event: any) {
        const msg = event.data || event;
        if (msg && msg.id) {
            if (msg.type === 'result') {
                const callback = this.eventCallbackMap[msg.id];
                delete this.eventCallbackMap[msg.id];
                callback?.(msg);
            }
            if (msg.type === 'call') {
                (async () => {
                    this.post(await this.execServiceMethod(msg, this.serviceMap));
                })();
            }
        }
    }

    async execServiceMethod(msg: any, services: ServiceMap) {
        const serviceMethod = services?.[msg.service]?.[msg.method];
        if (!serviceMethod) {
            return { id: msg.id, type: 'result', error: 'no service method' };
        }
        try {
            const result = await serviceMethod(...msg.args);
            return { id: msg.id, type: 'result', result };
        } catch (error) {
            return { id: msg.id, type: 'result', error };
        }
    }

    provideService(services: ServiceMap) {
        this.serviceMap = services;
    }

    callService<T = any>(service: string, method: string, ...args: any[]) {
        return new Promise<T>((resolve, reject) => {
            const id = Number(setTimeout(()=>{}));
            if (!id) {
                reject(new Error('create call id failed'));
                return;
            }
            const waitMsg = (msg: any) => {
                if (msg.error) {
                    const error = new Error(msg.error);
                    (error as any).data = msg;
                    reject(error);
                    return;
                }
                resolve(msg.result);
            };
            this.eventCallbackMap[id] = waitMsg;

            this.post({
                type: 'call',
                service,
                method,
                id,
                args,
            });
        });
    }
}