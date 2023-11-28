# web-service-rpc for vscode

方便vscode插件开发中使用webview的工具，方便将vue/react等框架生成的文件
作为vscode插件webview的html，并提供了双向注册RPC的方法，方便vscode插件与html互相调用

## 主要功能

* 将普通html嵌入vscode插件webview
* 提供双向注册RPC的方法
* 为html本地调试提供mock vscodeAPI 和 mock RPC注册

## 安装

``` bash
npm install vscode-webview-tool
```

## 使用

### vscode插件

#### 生成webview html

``` js
import { getHtmlForWebview } from 'vscode-webview-tool';

webview.html = getHtmlForWebview(context,'build/web','index.html');
```

context 为 vscode.ExtensionContext, 'build/web' 是web文件在项目下的路径，
'index.html' 为web的入口文件，多入口可以配置为其他入口文件名

对html的要求

不支持在js拆包懒加载。 可以在html中加载多个js,但是不能在js中动态加载本地js, 如lazyload


#### 注册方法给html调用

``` js
// vscode
import { VscodeServiceProvider, getHtmlForWebview } from 'vscode-webview-tool'

webview.html = getHtmlForWebview(context,'build/web','index.html')

const serviceProvider = new VscodeServiceProvider(webview)
serviceProvider.provideService({
    common:{
        something: ()=>{
            // do something
        }
    }
})

//html 调用
import { WebServiceProvider } from 'vscode-webview-tool/lib/web'

const serviceProvider = new WebServiceProvider()
serviceProvider.callService('common.something')
```

### html

#### 调用vscode插件注册的方法

``` js
import { WebServiceProvider } from 'vscode-webview-tool/lib/web'

const serviceProvider = new WebServiceProvider()
serviceProvider.callService('common.something')
```

#### 注册方法给vscode调用

与vscode插件中一致

``` js
// html
import { WebServiceProvider } from 'vscode-webview-tool/lib/web'

const serviceProvider = new WebServiceProvider()
serviceProvider.provideService({
    common:{
        something: ()=>{
            // do something
        }
    }
})

// vscode 调用
import { VscodeServiceProvider } from 'vscode-webview-tool'

const serviceProvider = new VscodeServiceProvider(webview)
serviceProvider.callService('common.something')
```

#### vscode api

获取了vscodeApi, 在非vscode环境也可以使用, 非vscode环境使用localStorage模拟State, 方便web调试

``` js
import { vscode } from 'vscode-webview-tool/lib/web'

vscode.postMessage('...')
vscode.getState()
vscode.setState({ a:1, b:2 })
```

## 示例项目

issue催催就有示例了...

与vue一起使用 [work-with-vue](../../examples/work-with-vue)

与react一起使用
