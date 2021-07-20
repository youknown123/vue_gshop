import Vue from 'vue'
import App from './App.vue'
import router from  './router'
import '/src/static/reset.css'
import store from "./vuex/store";
import 'lib-flexible'
Vue.config.productionTip = false

new Vue({
  store, //所有组件都能看到$store
  router, //所有组件都能看到 $router $route  <router-link> <router-view>
  render: h => h(App),
}).$mount('#app')
