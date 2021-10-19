/**
 * WebServiceProvider
 */

import { ServiceProvider, ServiceMap } from './service-provider';
import { MockServiceProvider } from './mock-service-provider';
import { MockVscodeApi } from './mock-vscode-api';

export const vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : new MockVscodeApi();

class RealWebServiceProvider extends ServiceProvider {
    public isMock = false;
    constructor() {
        super(
            (message) => {
                vscode.postMessage(message);
            },
            (handler) => {
                window.addEventListener('message', handler);
            },
        );
    }
    provideMockCallbackService(services: ServiceMap) {
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WebServiceProvider = ((vscode as unknown as MockVscodeApi).isMock ? 
    MockServiceProvider:
    RealWebServiceProvider);


