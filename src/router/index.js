import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

import zhuche from './zhuche' //注册登陆
import home from './home'     //首页--不包括底部选项卡
import index from '@/views/home/index' //首页
import kan from '@/views/home/kan'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect:'/home',
      meta:{
        title:"首页"
      },
      children:[
        ...home
      ]
    },
    {
      path: '/kan',
      name: 'kan',
      component: kan,
      meta:{
        title:"砍价列表"
      }
    },
    ...zhuche,
    
  ]
})
