<template>
  <div id="app">
    <div class="logo" />
    <div>use css can load local asset</div>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>use src cannot load asset</div>
    <div>or use url-loader to convert to dataURL</div>
    <div>extension path : {{extensionPath}}</div>
    <HelloWorld v-show="showHello" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue' // will be error by Vetur, need write vetur.config.js in project root dir
import { WebServiceProvider } from 'vscode-webview-tool/lib/web'
const serviceProvider = new WebServiceProvider()

if (serviceProvider.isMock) {
  serviceProvider.provideMockCallbackService({
    'common': {
      'getExtensionPath' : () => {return 'mock path'},
    }
  })
}

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() { return {
    extensionPath: 'unkown',
    showHello: true,
  }},
  async created() {
    this.extensionPath = await serviceProvider.callService('common','getExtensionPath')
    serviceProvider.provideService({
      'web':{
        'toggleHello':()=>{this.toggleHello()},
      }
    })
  },
  methods: {
    toggleHello: function(){
      console.log('toggleHello');
      this.showHello = !this.showHello;
    }
  }
}
</script>

<style>
html {
  background: #f0f0f0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 100px;
  height: 100px;
  background: url(./assets/logo.png);
  background-size: 100% 100%;
}
</style>
