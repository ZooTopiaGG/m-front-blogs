// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
import Elementui from 'element-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/font/style.css'
import { Loadmore, Toast, Indicator } from 'mint-ui'

//按需加载 Mint-UI
Vue.component(Loadmore.name,Loadmore)

window.Toast = Toast
window.Indicator = Indicator

// 监听滚动
import vuescroll from 'vue-scroll'

// console.log(vuescroll)

Vue.use(vuescroll)
Vue.use(vuex)

// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// import { Form, FormItem, Input, Button } from 'element-ui'

// Element 样式表
// import 'element-ui/lib/theme-default/base.css' -.路径更改

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
Vue.use(Elementui)

import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/common.css'
import './assets/js/device.js'
import Coms from './assets/js/fn.js'

Vue.config.productionTip = false

window.Coms = Coms

var config = {
  delay: 0
}

window.sr = new ScrollReveal(config);

// 正式网
// window.baseUrl = 'http://pay.lawyer-says.com/api/'
// 测试
// window.baseUrl = 'http://pay.lawyer-says.cn/'
// qs
window.Qs = require('../node_modules/qs')

// AXIOS
window.axios = require('../node_modules/axios')

// import axios from 'axios'
// 响应时间
axios.defaults.timeout = 5000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 测试网接口地址
// axios.defaults.baseURL = 'http://localhost:8086/'
// 正式网接口地址
axios.defaults.baseURL = 'http://api.55lover.com/'

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 在请求发出之前进行一些操作
  // window.loadingInstance = Loading.service({fullscreen: true, text: '正在加载...'});
  return config
}, err => {
  // Do something with request error
  Indicator.close()
  Toast('系统繁忙，请稍后重试')
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use(res => {
  // 在这里对返回的数据进行处理
  // loadingInstance.close();
  Indicator.close()
  return res
}, err => {
  // Do something with response error
  Indicator.close()
  Toast('系统繁忙，请稍后重试')
  return Promise.reject(err)
})

router.beforeEach((to, from, next) => {
  // 获取localstorage
  let user = window.localStorage.getItem('55lover_reader')
  let _user = JSON.parse(user)
  // console.log(_user)
  if (_user && _user.id) {
    // console.log(`您已登录--${_user.id}`)
    store.dispatch('YET_LOGIN', _user)
  } else {
    // console.log(`您未登录`)
    store.dispatch('NO_LOGIN', null)
  }
  // console.log(to)
  if (to.path == '/signin' || to.path == '/signup' || to.name == 'info') {
    store.commit('HIDE_NAV')
    store.commit('HIDE_FOOTER')
  } else {
    store.commit('SHOW_NAV')
    store.commit('SHOW_FOOTER')
  }
  if (to.name == 'home') {
    store.commit('BG_HIDE_NAV')
    // location.href = location.href
  } else {
    store.commit('BG_SHOW_NAV')
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

