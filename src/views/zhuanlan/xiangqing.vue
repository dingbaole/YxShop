<template>
  <div>
    <van-nav-bar title="专栏-详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <p v-html="data.title"></p>
      <img :src="data.pic" alt />
      <p v-html="data.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      id: "",
      data:{}
    };
  },
  components: {},
  mounted() {
    
    this.id = this.$route.params.aid;
    console.log(this.id);
    this.getConter()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getConter() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res);
        this.data = res.data
      });
    }
  }
};
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    padding: 5%;
    box-sizing: border-box;
    img{
        width: 100%;

    }
    p:nth-of-type(1){
        width: 100%;
        text-align: center;
        line-height: 0.5rem;
    }
    p:nth-of-type(2){
        line-height: 0.5rem;
    }
}
</style>
