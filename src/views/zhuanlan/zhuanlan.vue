<template>
  <div>
    <van-nav-bar title="专栏列表" left-text="返回" left-arrow @click-left="onClickLeft" class="title"/>
    <div class="box">
      <ul>
        <li v-for="(item,index) in jxList" :key="index">
          <img :src="item.pic" alt />
          <div class="conten">
            <p v-html="item.title"></p>
            <p v-html="item.descript"></p>
            <van-button type="default" class="button" @click="push(item)">next</van-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      jxList: []
    };
  },
  components: {},
  mounted() {
    this.getjx();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    getjx() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        this.jxList = res.data;
        console.log(res.data)
      });
    },
    push(item){
        this.$router.push({
            name:'zl_xq',
            params:{
                aid:item.id 
            }
        })
    }
  }
};
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    li{
        width: 100%;
        position: relative;
        margin-bottom: 0.4rem;
        img{
            width: 100%;
            height: 4rem;
        }
        .conten{
            position: absolute;
            width: 100%;
            top: 0.6rem;
            p{
                color: white;
                width: 100%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 0.7rem;
            }
            .button{
                margin-left: 2.6rem;
                background: none;
                border-radius: 0.3rem;
                color: white;
                padding: 0.2rem;
                box-sizing: border-box;
            }
        }
    }
}

</style>
