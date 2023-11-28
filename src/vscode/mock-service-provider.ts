/**
 * MockServiceProvider
 */

import { ServiceProvider, ServiceMap } from "../common/service-provider";

export class MockServiceProvider extends ServiceProvider {
  public isMock = true;
  mockCallbackService: ServiceMap = {};
  constructor() {
    super(
      () => {},
      (handler) => {
        window.addEventListener("message", handler);
      }
    );
  }

  provideMockCallbackService(services: ServiceMap) {
    this.mockCallbackService = services;
  }

  async callService<T = any>(service: string, method: string, ...args: any[]) {
    const id = Number(setTimeout(null as any));
    if (!id) {
      throw new Error("create call id failed");
    }
    const msg = {
      type: "call",
      service,
      method,
      id,
      args,
    };

    const info = await this.execServiceMethod(msg, this.mockCallbackService);
    if (info.error) {
      return Promise.reject(info.error);
    }
    return info.result;
  }
}
