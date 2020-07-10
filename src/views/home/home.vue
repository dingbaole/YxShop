<template>
  <div class="box">
    <div class="banner-box"> 
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                <img :src="item.picUrl">
            </van-swipe-item>
        </van-swipe>
        <nav>
            <ul class="kan-list">
                <li>
                    <van-icon name="like" size="50" color="red"/>
                    <p>签到</p>
                </li>
                <li>
                    <van-icon name="like" size="50" color="red"/>
                    <p>签到</p>
                </li>
                <li>
                    <van-icon name="like" size="50" color="red"/>
                    <p>签到</p>
                </li>
                <li>
                    <van-icon name="like" size="50" color="red"/>
                    <p>签到</p>
                </li>
            </ul>
        </nav>
    </div>
    <div class="kan">
        <p class="kan-title">全民砍价</p>
        <ul>
            <li v-for="(item,index) in kanList" :key="index" class="kan-list">
                <div class="kan-left">
                    <img :src="item.pic" alt="">
                </div>
                <div class="kan-right">
                    <p class="p-name" v-html="item.name"></p>
                    <p class="p-characteristic" v-html="item.characteristic"></p>
                    <ul>
                        <li>
                            <p class="p-red">${{ item.minPrice }}</p>
                            <p class="p-black">低价</p>
                        </li>
                        <li>
                            <p>${{ item.originalPrice }}</p>
                            <p>原价</p>
                        </li>
                        <li>
                            <p>${{ item.stores }}件</p>
                            <p>限量</p>
                        </li>
                    </ul>
                </div>
                
            </li>
        </ul>
    </div>
    <div class="jx">
        <p class="jx-title">精选专栏</p>
        <van-swipe :loop="false" :width="300">
            <van-swipe-item v-for="(item,index) in jxList" :key="index" class="item">
                <img :src="item.pic">
                <p class="jx-title1">
                    {{ item.title }}
                </p>
                <p class="jx-descript">
                    {{ item.descript }}
                </p>
            </van-swipe-item>     
        </van-swipe>
    </div>
    <div class="rq">
        <p class="rq-title">人气推荐</p>
        <ul class="rq-list">
            <li v-for="(item,index) in rqList" :key="index">
                    <img :src="item.pic" alt="">
                    <p>{{item.name}}</p>
                    <p>{{item.characteristic}}</p>
                    <p style="color:red">${{item.minPrice}}</p>
            </li>
        </ul>
    </div>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o">个人</van-tabbar-item>
    </van-tabbar>
    <div class="footer"></div>
  </div>
  
</template>

<script>
import "@/assets/reset.css";
export default {
    data(){
        return{
            active:0,
            bannerList:[],
            kanList:[],
            jxList:[],
            rqList:[]
        }
    },
    mounted() {
        this.getBanner()
        this.getkan()
        this.getjx()
        this.getrq()
    },  
    methods: {
        getBanner(){
            this.$axios({
                url:"https://api.it120.cc/small4/banner/list"
            }).then(res=>{
                if(res.code==0){
                    this.bannerList = res.data
                }
            })
        },
        getkan(){
            this.$axios({
                url:"https://api.it120.cc/small4/shop/goods/kanjia/list"
            }).then(res=>{
                this.kanList = res.data.goodsMap
            })
        },
        getjx(){
            this.$axios({
                url:"https://api.it120.cc/small4/cms/news/list"
            }).then(res=>{
                console.log(res.data)
                this.jxList = res.data
            })
        },
        getrq(){
            this.$axios({
                url:"https://api.it120.cc/small4/shop/goods/list"
            }).then(res=>{
                console.log(res.data)
                this.rqList = res.data
            })
        }
    },  
}
</script>

<style scoped lang="scss">
    .banner-box{
        width: 100%;
        position: relative;
        nav{
            width: 100%;
            position: absolute;
            bottom: 0;
            background: white;
            height: 2rem;
            border-radius: 0.5rem 0.5rem 0 0;
            ul{
                width: 100%;
                display: flex;
                justify-content: space-around;
                height: 2rem;
                padding-top: 0.3rem;
                box-sizing: border-box;
                p{
                    text-align: center;
                }
            }
        }
    }
    .kan{
        margin-top: 20px;
        background: white;
        .kan-title{
            width: 100%;
            text-align: center;
            height: 1rem;
            line-height: 1rem;
        }
        ul{
            width: 100%;
            .kan-list{
                width: 100%;
                display: flex;
                padding: 0.2rem;
                box-sizing: border-box;
                border-top: 1px solid rgb(192, 184, 184);
                .kan-left{
                    width: 30%;
                    img{
                        width: 100%;
                    }
                }
                .kan-right{
                    margin-left: 0.1rem;
                    width: 70%;
                    position: relative;
                    .p-characteristic{
                        line-height: 0.7rem;
                        font-size: 0.2rem;
                        color: rgb(187, 187, 187);
                    }
                    ul{
                        display: flex;
                        justify-content: space-between;
                        position: absolute;
                        bottom: 0;
                        li{
                            border: none;
                            
                            .p-red{
                                color: red;
                            }
                            .p-black{
                                color: black;
                            }
                            p{
                                color: rgb(184, 179, 179);
                                text-align: center;
                                line-height: 0.4rem;
                            }
                        }
                    }
                }
            }
        }
    }
    .jx{
        width: 100%;
        background: white;
        margin-top: 20px;
        .jx-title{
            width: 100%;
            text-align: center;
            height: 1rem;
            line-height: 1rem;
        }
        img{
            width: 6rem;
            height: 4rem;
        }
        .item{
            margin-left: 0.12rem;
            height: 5rem;
            .jx-title1{
                    font-size: 0.18rem;
                    color: #2C2C2C;
                    margin-top: 0.12rem;
                    width: 4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
            }
            .jx-descript{
                    font-size: 0.14rem;
                    color: #A8A8A8;
                    margin-top: 0.2rem;
                    width: 3.24rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
            }
        }
    }
    .rq{
        width: 100%;
        background: white;
        margin-top: 20px;
        .rq-title{
            width: 100%;
            text-align: center;
            height: 1rem;
            line-height: 1rem;              
        }
        img{
            width: 2.33rem;
            height: 3rem;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li{
                width: 50%;
                padding: 0.2rem 0.5rem;
                box-sizing: border-box;
                p{
                    font-size: 0.2rem;
                    line-height: 0.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .footer{
        width: 100%;
        height: 1rem;
    }
    .box{
        background: rgb(230, 228, 228);
    }
    
</style>