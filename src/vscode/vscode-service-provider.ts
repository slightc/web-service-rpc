/**
 * VscodeServiceProvider
 */
import { ExtensionContext, Uri, Webview } from "vscode";
import { ServiceProvider } from "../common/service-provider";

export class VscodeServiceProvider extends ServiceProvider {
  constructor(webview: Webview) {
    super(
      (message) => webview.postMessage(message),
      (handler) => webview.onDidReceiveMessage(handler)
    );
  }
}
