import { ExtensionContext, Uri, Webview } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceProvider } from './common/service-provider';

export async function getHtmlForWebview(context: ExtensionContext, baseUrl = 'build', entryFile = 'index.html') {
    const basePath = path.join(context.extensionPath, baseUrl);
    const htmlContent = await fs.promises.readFile(path.join(basePath, entryFile));
    return htmlContent.toString().replace(/(?<=(href|src)=")\S*?(?=")/g, (s) => {
        if (/^(http|\/\/)/.test(s)) {
            return s;
        }
        return Uri.file(path.join(basePath, s)).with({ scheme: 'vscode-resource' }).toString();
    });
}

export class VscodeServiceProvider extends ServiceProvider {
    constructor(webview: Webview) {
        super(
            (message) => webview.postMessage(message),
            (handler) => webview.onDidReceiveMessage(handler),
        );
    }
}