<template>
  <div>
    <van-swipe :loop="false" :width="300" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in jxList" :key="index" class="item">
        <img :src="item.pic" />
        <p class="jx-title1">{{ item.title }}</p>
        <p class="jx-descript">{{ item.descript }}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "",
  props:['jxList'],
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
img {
  width: 6rem;
  height: 4rem;
}
.item {
  margin-left: 0.12rem;
  height: 5rem;
  .jx-title1 {
    font-size: 0.18rem;
    color: #2c2c2c;
    margin-top: 0.12rem;
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .jx-descript {
    font-size: 0.14rem;
    color: #a8a8a8;
    margin-top: 0.2rem;
    width: 3.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
