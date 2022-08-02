import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局的样式文件
import './assets/css/global.less'
// 引入字体图标
import './assets/font/iconfont.css'

import SocketService from '@/utils/socket_service'

import axios from 'axios'

Vue.prototype.$socket = SocketService.Instance
// 请求基准路径的配置
axios.defaults.baseURL = 'http://localhost:8088/api/'
// 将axios挂载到vue的原型对象上
// 在别的组建中 this.$http
Vue.prototype.$http = axios

// 将全局的ECharts对象挂载到vue的原型对象上
// 在别的组建中通过 this.$echarts使用
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
