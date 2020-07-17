<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banner" :key="index" class="item">
        <img :src="item.pic" alt />
      </van-swipe-item>
    </van-swipe>
    <!--商品详情  -->
    <div class="box">
      <van-tabs v-model="active" class="xq">
        <van-tab title="商品介绍" class="xq_item">
          <p v-html="content"></p>
        </van-tab>
        <van-tab title="商品评价"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:['banner','content'],
  data() {
    return {
         banner: [],
         active: 0,
         content: "",
    };
  },
  components: {}
};
</script>

<style  lang="scss">
.my-swipe {
  width: 100%;
  .item {
    width: 100%;
    img {
      width: 100%;
      height: 6rem;
    }
  }
}
.xq {
  width: 100%;
  .xq_item {
    width: 100% !important;
    img {
      width: 100% !important;
      height: 50% !important;
    }
  }
}

</style>
