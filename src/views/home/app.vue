<template>
  <div class>
    <van-search placeholder="请输入搜索关键词" @input="shou()" v-model="value" />
    <van-tree-select height="100vh" :items="fenlei" :main-active-index.sync="index" v-if="show">
      <template #content>
        <div class="box">
          <div class="list" v-for="(item,index) in list" :key="index" @click="xq(item)">
            <img :src="item.icon" alt />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </template>
    </van-tree-select>
    <shangpin :rqList="rqList" class="top" v-else />
  </div>
</template>

<script>
import shangpin from "@/components/home/shangpin";
export default {
  name: "",
  data() {
    return {
      fenlei: [{ text: "全部商品" }],
      index: 0,
      listId: [0],
      allList: [],
      value: "",
      rqList: [],
      allrqList:[],
      show: true
    };
  },
  components: { shangpin },
  mounted() {
    this.getfenlei();
    this.getrq()
  },
  computed: {
    list() {
      return this.allList.filter(item => {
        if (this.index == 0) {
          return this.allList;
        }
        return item.pid == this.listId[this.index];
      });
    }
  },
  methods: {
    getfenlei() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/category/all"
      }).then(res => {
        console.log(res.data);
        this.allList = res.data;
        res.data.forEach(item => {
          if (item.pid == 0) {
            this.fenlei.push({ text: item.name });
            this.listId.push(item.id);
          }
        });
        console.log(this.listId);
      });
    },
    xq(item) {
      this.$router.push({
        path: "/fenlei/xiangqing",
        query: {
          id: item.id
        }
      });
    },
    shou() {
      var arr = []
      if (this.value == "") {
        this.show = true;
      } else {
        this.show = false;
        this.allrqList.forEach(item => {
          console.log(item.name.search(this.value))
          if (item.name.search(this.value) != -1) {
            console.log(item);
            arr.push(item);
          }
        });
      }
      this.rqList = arr
    },
    getrq() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.name.indexOf("测试");
        });
        this.allrqList = arr;
        console.log(arr)
      });
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-wrap: wrap;
  .list {
    width: 30%;
    padding: 0.1rem;
    box-sizing: border-box;
    img {
      width: 100%;
    }
    p {
      font-size: 0.2rem;
      width: 100%;
      text-align: center;
      line-height: 0.5rem;
    }
  }
}
</style>
