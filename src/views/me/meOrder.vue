<template>
  <div>
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <div class="list">
      <div class="box" v-for="(item,index) in goodsMap" :key="index">
        <p>订单详情</p>
        <van-card
          v-for="(it,i) in item"
          :key="i"
          :num="it.number"
          price="2.00"
          :desc="it.goodsName"
          :thumb="it.pic"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.token = JSON.parse(localStorage.getItem("09A_user")).token;
    this.getOrder();
  },
  data() {
    return {
      token: "",
      goodsMap: []
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getOrder() {
      let fromData = new FormData();
      fromData.append("token", this.token);

      this.$axios
        .post("https://api.it120.cc/small4/order/list", fromData)
        .then(res => {
          console.log(res);
          this.goodsMap = res.data.goodsMap;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  margin-top: 1rem;
  .box{
      background: #fafafa;
      margin-top: 0.3rem;
      p{
          text-indent: 0.2rem;
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.2rem;
      }
  }
}
</style>
