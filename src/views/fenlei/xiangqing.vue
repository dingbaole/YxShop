<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />
    <shangpin :rqList="rqList"  class="top" v-if="this.rqList.length>0"/>
    <van-empty description="描述文字" v-else class="top"/>
  </div>
</template>

<script>
import shangpin from "@/components/home/shangpin";
export default {
  name: "",
  data() {
    return {
      id: "",
      rqList: []
    };
  },
  components: {
    shangpin
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getrq();
  },
  methods: {
    getrq() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.categoryId == this.id;
        });
        this.rqList = arr;
      });
    },
    onClickLeft(){
        this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.top{
    margin-top: 1rem;
}
</style>
