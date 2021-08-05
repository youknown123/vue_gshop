import Vue from 'vue'
import 'lib-flexible'
import {Button} from 'mint-ui'
import router from  './router'
import store from "./vuex/store";
import '/src/static/reset.css'
import App from './App.vue'
import Header from "./components/Header/Header";
import './validate'
import * as API from './api'
// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API
Vue.config.productionTip = false
//全局引入Header组件
Vue.component('Header',Header)
Vue.component('mt-button',Button)
new Vue({
  store, //所有组件都能看到$store
  router, //所有组件都能看到 $router $route  <router-link> <router-view>
  render: h => h(App),
}).$mount('#app')
