import { WebviewApi } from 'vscode-webview';

export class MockVscodeApi implements WebviewApi<any> {
    public isMock: boolean = true;
    postMessage(message: unknown) {

    }
    getState() {
        const state = localStorage.getItem('mock-vscode-api-state');
        if (!state) {
            return undefined;
        }
        try {
            return JSON.parse(state);
        } catch (error) {
            return undefined;
        }
    }
    setState(newState: any) {
        let state: string = '';
        if (newState) {
            try {
                state = JSON.stringify(newState);
            } catch (error) {
                //
            }
        }
        localStorage.setItem('mock-vscode-api-state', state);
        return newState;
    }
}