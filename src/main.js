import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
import { Message } from 'element-ui'
import echarts from 'echarts'  //引入echart
import common from './utils/common.js';

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts   //将echarts引入到vue的原型中
Vue.prototype.$message = Message
Vue.prototype.$common =common

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
