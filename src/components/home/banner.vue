<template>
  <div>
    <div class="banner-box">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
      <nav>
        <ul class="kan-list">
          <li>
            <van-icon name="like" size="50" color="red" />
            <p>签到</p>
          </li>
          <li>
            <van-icon name="gift" size="50" color="red" />
            <p>礼卷</p>
          </li>
          <router-link tag="li" to="/kan">
            <van-icon name="gem" size="50" color="red" />
            <p>砍价</p>
          </router-link>
          <li>
            <van-icon name="fire" size="50" color="red" />
            <p>专栏</p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  props: ["bannerList"]
};
</script>

<style scoped lang="scss">
.banner-box {
  width: 100%;
  position: relative;
  img{
    width: 100%;
  }
  nav {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: white;
    height: 2rem;
    border-radius: 0.5rem 0.5rem 0 0;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 2rem;
      padding-top: 0.3rem;
      box-sizing: border-box;
      p {
        text-align: center;
      }
    }
  }
}
</style>

