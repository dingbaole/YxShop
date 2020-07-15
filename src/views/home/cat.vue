<template>
  <div class>
    <van-nav-bar title="我的购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="item" v-for="(item,index) in this.$store.state.gwc_list" :key="index">
      <van-checkbox v-model="item.checked"></van-checkbox>
      <van-card
        :num="item.nums"
        :price="item.price"
        :title="item.name"
        :thumb="item.pic"
        class="kp"
      >
        <template #num>
          <van-stepper v-model="item.nums" />
        </template>
      </van-card>
    </div>
    <van-submit-bar style="bottom:0.88rem" :price="totalAmounts" button-text="提交订单" @submit="tijiao">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    console.log(this.$store.state.gwc_list);
    this.carList = this.$store.state.gwc_list;
  },
  data() {
    return {
      checked: true,
      carList: []
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    tijiao(){
      this.$router.push('/qr_dd')
    }
  },
  computed: {
    totalAmounts() {
      let sum = 0;
      this.carList.forEach(item => {
        if (item.checked == true) {
          sum += item.nums * item.price;
        }
      });
      return sum * 100;
    }
  },
  watch: {
    carList: {
      handler(value) {
        console.log(value);
        this.$store.commit("set_gwcList", value);
        let arr = value.filter(item=>{
            return item.checked == true
        })
        console.log(arr)
        if(arr.length == this.carList.length){
            this.checked = true
        }else{
            this.checked = false
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
}
.kp {
  flex: 1;
}
</style>
