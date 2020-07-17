<template>
  <div>
    <van-nav-bar
      title="砍价列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
      
    />
    <div class="top">

    </div>
    <kan :kanList="kanList" :kanResult="kanResult" />
  </div>
</template>

<script>
import kan from "@/components/home/kan";
export default {
  name: "",
  components: {
    kan
  },
  data() {
    return {
      kanList: [],
      kanResult:[]
    };
  },
  mounted() {
    this.getkan();
    console.log(this.kanList)
  },
  methods: {
    getkan() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        this.kanList = res.data.goodsMap;
        console.log(res)
        this.kanResult = res.data.result
      });
    },
    onClickLeft(){
        this.$router.push('/')
    }
  }
};
</script>

<style scoped lang="scss">
.top{
   height: 1rem;
}
</style>
