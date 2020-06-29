// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/utils/axios'//引入封装
import store from '@/store/index'

Vue.config.productionTip = false
//引入vant组件
import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)
//挂载封装的拦截器
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
