import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

import zhuche from './zhuche' //注册登陆
import home from './home'     //首页--不包括底部选项卡
import index from '@/views/home/index' //首页
import kan from '@/views/home/kan'

import xiangqing from '@/views/fenlei/xiangqing' //分类页面的详情页面
import search from '@/views/fenlei/search'//分类页面的商品详情

import zhuanlan from '@/views/zhuanlan/zhuanlan' //专栏页面
import zl_xq from '@/views/zhuanlan/xiangqing' //专栏详情页面

import sp_xq from '@/views/sp/sp_xq'//商品详情
import qr_dd from '@/views/sp/qr_dd'//确认订单
import qr_fk from '@/views/sp/qr_fk'//确认付款 

import img_ljz from '@/views/lanjiazai'//图片懒加载页面

import kan_sp from '@/views/kan/kan_sp'
import kj_xq from '@/views/kan/kj_xq'


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
    {
      path:'/fenlei/xiangqing',
      name:'xiangqing',
      component:xiangqing,
      meta:{
        title:"商品详情"
      }
    },
    {
      path:'/fenlei/search',
      name:'search',
      component:search,
      meta:{
        title:"商品详情"
      }
    },
    {
      path:'/zhuanlan',
      name:'zhuanlan',
      component:zhuanlan,
      meta:{
        title:"专栏"
      }
    },
    {
      path:'/zhuanlan/xiangqing/',
      name:'zl_xq',
      component:zl_xq,
      meta:{
        title:"专栏-详情"
      }
    },
    {
      path:'/sp/sp_xq',
      name:'sp_xq',
      component:sp_xq,
      meta:{
        title:"商品详情"
      }
    },
    {
      path:'/qr_dd',
      name:'qr_dd',
      component:qr_dd,
      meta:{
        title:"确认订单"
      }
    },
    {
      path:'/qr_fk',
      name:'qr_fk',
      component:qr_fk,
      meta:{
        title:"确认付款"
      }
    },
    {
      path:'/kan_sp',
      name:'kan_sp',
      component:kan_sp,
      meta:{
        title:"砍价商品"
      }
    },
    {
      path:'/kj_xq',
      name:'kj_xq',
      component:kj_xq,
      meta:{
        title:"砍价详情"
      }
    },
    {
      path:'/img_ljz',
      name:'img_ljz',
      component:img_ljz,
      meta:{
        title:"图片懒加载"
      }
    },
    ...zhuche,
    
  ]
})
