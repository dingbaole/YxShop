<template>
  <div class="box">
    <banner :bannerList="bannerList"/>
    <div class="kan">
        <p class="kan-title">全民砍价</p>
        <kan :kanList="kanList"/>
    </div> 
    <div class="jx">
        <p class="jx-title">精选专栏</p>
        <jx :jxList="jxList"/>
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
    <div class="footer"></div>
  </div>
  
</template>

<script>
import "@/assets/reset.css";
import banner from "@/components/home/banner"
import kan from "@/components/home/kan"
import jx from "@/components/home/jx"
export default {
    components:{
        banner,kan,jx
    },
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
                console.log(res.data.goodsMap)
                let arr = Object.keys(res.data.goodsMap).splice(-3)

                console.log(arr)
                let list = []
                arr.forEach(index=>{
                    list.push(res.data.goodsMap[index])
                })
                this.kanList = list
            })
        },
        getjx(){
            this.$axios({
                url:"https://api.it120.cc/small4/cms/news/list"
            }).then(res=>{
                this.jxList = res.data
            })
        },
        getrq(){
            this.$axios({
                url:"https://api.it120.cc/small4/shop/goods/list"
            }).then(res=>{
                let arr = res.data.filter(item=>{
                    return item.name.indexOf("测试")
                })
                this.rqList = arr
            })
        }
    },  
}
</script>

<style scoped lang="scss">

    .kan{
        .kan-title{
            width: 100%;
            text-align: center;
            line-height: 1rem;
            background: white;
            margin-top: 0.5rem;
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
            width: 100%;
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
                img{
                    width: 100%;
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