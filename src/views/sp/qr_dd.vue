<template>
  <div>
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="dizhi">
      <div>
        <van-icon name="location-o" class="tb" />
      </div>
      <div>
        <p>{{ dz_xx.address }}</p>
        <p>{{ dz_xx.linkMan }}-{{ dz_xx.mobile }}</p>
      </div>
      <div>
        <van-icon name="arrow" class="tb" />
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="box">
      <div class="item" v-for="(item,index) in carList" :key="index">
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
    </div>
    <van-submit-bar :price="num" button-text="确认订单" @submit="onSubmit" />
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.carList = this.$store.state.gwc_list.filter(item => {
      return item.checked == true;
    });
    this.tocken = JSON.parse(localStorage.getItem("09A_user")).token;
    this.dizhi();
  },
  data() {
    return {
      carList: [], //订单数据
      tocken: "", //用户登录信息
      dz_xx: {}
      //  dizhi:{}//地址信息
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    dizhi() {
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: this.tocken
        }
      }).then(res => {
        console.log(res.data);
        this.dz_xx = res.data;
      });
    },
    // 提交订单 -- 跳转到确认付款
    onSubmit() {
      this.$router.push({
        name: "qr_fk",
        params: {
          carList: this.carList
        }
      });
    }
  },
  computed: {
    num() {
      var nuber = 0;
      this.carList.forEach(element => {
        nuber += element.nums * element.price;
      });
      return nuber * 100;
    }
  }
};
</script>

<style scoped lang="scss">
.dizhi {
  width: 100%;
  background: rgb(241, 241, 241);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  padding: 4%;
  box-sizing: border-box;
  div:nth-of-type(2) {
    flex: 1;
  }
  div:nth-of-type(1) {
    width: 10%;
  }
  p {
    line-height: 0.6rem;
  }
}
</style>
