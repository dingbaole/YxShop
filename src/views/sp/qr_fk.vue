<template>
  <div class="box">
    <van-nav-bar title="确认付款" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 商品订单详情 -->
    <div class="sp_xx">
      <div>
        <van-icon name="gold-coin-o" color="red" size="20" />
      </div>
      <div>
        <p>商品总额:{{ num }}元</p>
        <p>订单号:{{ dd_xx.orderNumber }}</p>
      </div>
    </div>
    <!-- 商品地址信息 -->
    <div class="dizhi">
      <div>
        <van-icon name="location-o" class="tb" color="blue" size="20"/>
      </div>
      <div>
        <p>{{ dz_xx.address }}</p>
        <p>{{ dz_xx.linkMan }}-{{ dz_xx.mobile }}</p>
      </div>
      <div>
        <van-icon name="arrow" class="tb" />
      </div>
    </div>
    <div class="zf">
      <p>微信支付:{{ num }}元</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.carList = this.$route.params.carList;
    this.tocken = JSON.parse(localStorage.getItem("09A_user")).token;
    this.transaction_code();
    this.get_dz_xx();
  },
  data() {
    return {
      carList: [], //商品信息,
      tocken: "",
      dd_xx: [], //订单信息
      dz_xx: [] //地址信息
    };
  },
  components: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //生成订单号
    transaction_code() {
      var arr = [];
      this.carList.forEach(res => {
        console.log(res);
        var obj = new Object();
        obj.goodsId = res.id;
        obj.number = res.nums;
        obj.propertyChildIds = res.propertyChildIds;

        arr.push(obj);
      });
      console.log(arr);
      var data = new FormData();
      data.append("token", this.tocken);
      data.append("goodsJsonStr", JSON.stringify(arr));
      this.$axios
        .post("https://api.it120.cc/small4/order/create", data)
        .then(res => {
          console.log(res);
          this.dd_xx = res.data;
        });
    },
    //获取地址信息
    get_dz_xx() {
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: this.tocken
        }
      }).then(res => {
        console.log(res.data);
        this.dz_xx = res.data;
      });
    }
  },
  computed: {
    num() {
      var number = 0;
      this.carList.forEach(res => {
        number += res.nums * res.price;
      });
      return number;
    }
  }
};
</script>

<style scoped lang="scss">
.sp_xx {
  width: 100%;
  padding: 4%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(238, 237, 237);
  div:nth-of-type(1) {
    width: 10%;
  }
  p {
    line-height: 0.4rem;
  }
}
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

.box {
  height: 100%;
  .zf {
    position: fixed;
    width: 100%;
    background: red;
    color: white;
    bottom: 0;
    p {
      width: 100%;
      text-align: center;
      line-height: 1rem;
    }
  }
}

body {
  width: 100%;
  height: 100%;
}
</style>
