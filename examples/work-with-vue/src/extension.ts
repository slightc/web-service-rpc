// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as webviewTool from 'vscode-webview-tool';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "work-with-vue" is now active!');

	let webviewPanel: vscode.WebviewPanel | undefined;
	let serviceProvider: webviewTool.VscodeServiceProvider;

	const openPage = async () => {
		if (webviewPanel) {
			try {
				webviewPanel.reveal();
				return;
			} catch (e) { }
		}
		webviewPanel = vscode.window.createWebviewPanel('vue-hello', '页面', vscode.ViewColumn.One, { enableScripts: true, retainContextWhenHidden: true });

		serviceProvider = new webviewTool.VscodeServiceProvider(webviewPanel!.webview);
		serviceProvider.provideService({
			'common': {
				'getExtensionPath': () => { return context.extensionPath; },
			}
		});

		console.log('create webview html');

		webviewPanel.webview.html = await webviewTool.getHtmlForWebview(context, 'out/web/vue-hello');


		console.log('===================================================');
		console.log(webviewPanel.webview.html);
		console.log('===================================================');

		webviewPanel.onDidDispose(() => {
			return Promise.reject(new Error(''));
		});
		webviewPanel.onDidChangeViewState((e) => {
			console.log('onDidChangeViewState ', e);
		});
		webviewPanel.onDidDispose(() => {
			webviewPanel = undefined;
		});

	};

	context.subscriptions.push(vscode.commands.registerCommand('work-with-vue.toggleHello', async () => {
		console.log('call web toggleHello');
		try {
			await serviceProvider?.callService('web', 'toggleHello');
		} catch (error) {
			console.log('error', error);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('work-with-vue.openPage', async () => {
		if(!webviewPanel){
			await vscode.commands.executeCommand('vscode.setEditorLayout', { orientation: 0, groups: [{ size: 1 }] });
		}
		openPage();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
