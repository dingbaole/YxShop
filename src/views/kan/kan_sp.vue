<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <spxq :banner="banner" :content="content" />
    <div class="bootom" @click="push">
        立即砍一刀
    </div>
  </div>
</template>

<script>
import spxq from "@/components/sp_xq";
export default {
  name: "",
  mounted() {
    this.id = this.$route.query.id;
    this.kjid = this.$route.query.kjid
    this.getdata();
    console.log(this.id,this.kjid)
  },
  data() {
    return {
      banner: [],
      content: [],
      id: "",
      kjid:"",
      Info: []
    };
  },
  components: { spxq },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getdata() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res);
        this.Info = res.data.basicInfo;
        this.banner = res.data.pics;
        this.content = res.data.content;
        console.log(res);
      });
    },
    push(){
      this.$router.push({
        path:"/kj_xq",
        query:{
          kjid:this.kjid,
          id:this.id
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
.bootom{
    width: 100%;
    line-height: 1rem;
    background: red;
    color: white;   
    position: fixed;
    bottom: 0;
    text-align: center;
}
</style>
