<template>
  <div>
    <router-view></router-view>
    <van-tabbar  route >
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/app">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cat">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped></style>
