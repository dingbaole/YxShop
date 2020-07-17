<template>
  <div class="box">
    <banner :bannerList="bannerList" />
    <div class="kan">
      <p class="kan-title">全民砍价</p>
      <kan :kanList="kanList" :kanResult="kanResult" />
    </div>
    <div class="jx">
      <p class="jx-title">精选专栏</p>
      <jx :jxList="jxList" />
    </div>
    <div class="rq">
      <p class="rq-title">人气推荐</p>
      <shangpin :rqList="rqList" />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import "@/assets/reset.css";
import banner from "@/components/home/banner";
import kan from "@/components/home/kan";
import jx from "@/components/home/jx";
import shangpin from "@/components/home/shangpin"
export default {
  components: {
    banner,
    kan,
    jx,
    shangpin
  },
  data() {
    return {
      active: 0,
      bannerList: [],
      kanList: [],
      jxList: [],
      rqList: [],
      kanResult:[]
    };
  },
  mounted() {
    this.getBanner();
    this.getkan();
    this.getjx();
    this.getrq();
  },
  methods: {
    getBanner() {
      this.$axios({
        url: "https://api.it120.cc/small4/banner/list"
      }).then(res => {
        if (res.code == 0) {
          this.bannerList = res.data;
        }
      });
    },
    getkan() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        console.log(res.data.goodsMap);
        // 把对象中key的拿出来转换成数组，然后进行截取
        let arr = Object.keys(res.data.goodsMap).splice(-3);
        let list = [];
        arr.forEach(index => {
          list.push(res.data.goodsMap[index]);
        });
        this.kanList = list;
        this.kanResult = res.data.result
      });
    },
    getjx() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        this.jxList = res.data;
      });
    },
    getrq() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.name.indexOf("测试");
        });
        this.rqList = arr;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.kan {
  .kan-title {
    width: 100%;
    text-align: center;
    line-height: 1rem;
    background: white;
    margin-top: 0.5rem;
  }
}
.jx {
  width: 100%;
  background: white;
  margin-top: 20px;
  .jx-title {
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
  }
}
.rq {
  width: 100%;
  background: white;
  margin-top: 20px;
  .rq-title {
    width: 100%;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
  }
}
.footer {
  width: 100%;
  height: 1rem;
}
.box {
  background: rgb(230, 228, 228);
}
</style>