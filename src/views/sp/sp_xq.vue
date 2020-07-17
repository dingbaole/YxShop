  <template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    
    <spxq :banner="banner" :content="content"/>
    <!-- 商品规格弹框 -->
    <van-sku v-model="show" :sku="sku" :goods="goods" @add-cart="push" @stepper-change="shuliang" @sku-selected="leimu" />

    <!-- 底部点击加入购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="push_gwc" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="show=true" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import spxq from '@/components/sp_xq';
export default {
  name: "",
  data() {
    return {
      data: {},
      banner: [],
      id: "",
      active: 0,
      content: "",
      show: false,
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "s1",
            v: [
              {
                id: "1",
                name: "红色"
              }
            ]
          }
        ],
        list: [],
        price: 1000,
        stock_num: 100
      },
      goods: { picture: "" },

      nums: 1,
      Info: [],
      property:''
    };
  },
  components: {spxq},
  mounted() {
    this.id = this.$route.query.id;
    this.getdata();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    getdata() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res);
        this.Info = res.data.basicInfo;
        this.banner = res.data.pics;
        this.content = res.data.content;
        this.goods.picture = this.banner[0].pic;
        this.getlist(res);
      });
    },
    //接取拼接sku当前数据
    getlist(data) {
      console.log(data);
      let tree = [];
      let list = [];
      data.data.properties.forEach(item => {
        let obj = new Object();
        obj.k = item.name;
        obj.k_s = `c1_${item.id}`;
        obj.v = item.childsCurGoods;

        tree.push(obj);
      });

      tree.forEach(item => {
        item.v.forEach(arr => {
          // console.log(arr.id,item.k_s)
          let obj = new Object();
          obj[item.k_s] = arr.id;
          obj.id = item.k_s.split("_")[1];
          obj.price = 100;
          obj.stock_num = 110;
          list.push(obj);
          // console.log(list)
        });
      });

      console.log(list);
      this.sku.tree = tree;
      this.sku.list = list;
      console.log(this.sku);
    },
    //商品详情点击切换类目时候触发的函数
    leimu(value){
      this.property = `${value.selectedSkuComb.id}:${value.selectedSkuComb.c1_8795}`
    },
    // 弹框出来之后点击添加购物车
    push() {
      // 如果没有登陆过账号跳转到登陆页面
      if (localStorage.getItem("09A_user") == null) {
        this.$router.push("/denglu");
        return false;
      }
      let gwc_list = this.$store.state.gwc_list;
      console.log(this.property)
      var obj = new Object();
      obj.id = this.Info.id;
      obj.name = this.Info.name;
      obj.pic = this.Info.pic;
      obj.price = this.Info.originalPrice;
      obj.nums = this.nums;
      obj.checked = true;
      obj.propertyChildIds = this.property
      
      console.log(obj);
      var index = gwc_list.findIndex(item => {
        return item.id == this.Info.id;
      });

      if (index == -1) {
        gwc_list.push(obj);
      } else {
        // gwc_list[index].nums += this.nums
        gwc_list[index].nums += this.nums;
      }

      console.log(gwc_list);
      this.$store.commit("set_gwcList", gwc_list);
      
      this.$router.push('/cat')
    },
    shuliang(value) {
      this.nums = value;
    },
    push_gwc(){
      this.$router.push('/cat')
    }
  }
};
</script>

<style  lang="scss">

.box {
  width: 100% !important;
}
</style>
