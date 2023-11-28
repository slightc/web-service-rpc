# web-service-rpc

基于postMessage的RPC通信工具


## 主要功能
* 提供双向注册RPC的方法


## 安装

``` bash
npm install web-service-rpc
```

## 使用

``` js
// vscode
import { ChildServiceProvider } from 'web-service-rpc/lib/web'

const childService = new ChildServiceProvider(window.parent);
childService.provideService({
    common:{
        something: ()=>{
            // do something
        }
    }
});

//html 调用
import { ParentServiceProvider } from 'web-service-rpc/lib/web'


const parentService = new ParentServiceProvider(iframe.contentWindow);

function onIframeLoad() {
    parentService.callService('common.something');
}
```

## 示例项目

[web-iframes](./examples/web-iframes)


## for vscode

[see here](./src/vscode/README.md)
