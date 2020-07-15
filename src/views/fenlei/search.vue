<template>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" @keydown.enter="enter"/>
    <div class="history" v-show="show">
      <p>
        <span>历史记录</span>
        <van-icon name="delete" size="20" @click="delet"/>
      </p>
      <ul>
        <li v-for="(item,index) in searchList" :key="index">{{ item }}</li>
      </ul>
    </div>
    <shangpin :rqList="list" v-show="!show"/>
  </div>
</template>

<script>
import shangpin from "@/components/home/shangpin";
import storage from "@/utils/storage"
export default {
  name: "",
  data() {
    return {
      value: "", //输入框内容
      allList: [], //所有的数据
      searchList:[],//历史记录
      show: true //控制历史记录显示隐藏
    };
  },
  components: { shangpin },
  mounted() {
    this.getrq();
    this.get()
  },
  methods: {
    getrq() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.name.indexOf("测试") == -1;
        });
        this.allList = arr;
      });
    },
    enter(){
        this.searchList.unshift(this.value)
        if(this.searchList.length>8){
            this.searchList.pop()
        }
        storage.set('search',this.searchList,true)
        this.value = ""
        this.show = true
    },
    get(){
        let data = storage.get('search',true)
        this.searchList = (data==null?[]:data)
    },
    delet(){
        storage.remove('search')
        this.get()
    }
  },
  computed: {
    list() {
        console.log(this.value);
      if (this.value == "") {
        this.show = true
        return []
      }
        this.show = false;
      return this.allList.filter(item => {
        return item.name.indexOf(this.value) > 0;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.history {
  padding: 5%;
  box-sizing: border-box;
  p {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 2%;
      padding: 2%;
      box-sizing: border-box;
      border: 1px solid black;
      border-radius: 0.3rem;
    }
  }
}
</style>
