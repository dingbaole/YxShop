<template>
  <div>
    <div class="top">
      <p class="fh" @click="to">
        <van-icon name="arrow-left" size="20" color="white" />
      </p>
      <p class="tx">
        <van-icon name="contact" size="70" color="white" />
      </p>
      <div class="sp">
        <img :src="Info.pic" alt />
        <div>
          <p style="font-size:0.12rem">{{ Info.name }}</p>
          <p>
            <span style="font-size:0.16rem;color:#b09972">低价:{{ Info.kanjiaPrice }}</span>
            <span
              style="font-size:0.16rem;color:#8e8f90;margin-left:0.5rem"
            >原价:{{ Info.originalPrice }}</span>
          </p>
        </div>
      </div>
      <div class="sj">
        <p>
          <span>{{ shijian.tian }}</span>:
          <span>{{ shijian.xs }}</span>:
          <span>{{ shijian.fz }}</span>:
          <span>{{ shijian.miao }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.token = JSON.parse(localStorage.getItem("09A_user")).token;
    this.kjid = this.$route.query.kjid;
    this.id = this.$route.query.id;
    this.get_kjxq(), this.getdata();
    console.log(this.Info);
  },
  data() {
    return {
      token: "",
      kjid: "",
      id: "",
      banner: [],
      content: [],
      Info: [],
      haomiao: ""
    };
  },
  components: {},
  methods: {
    get_kjxq() {
      var obj = new FormData();
      obj.append("kjid", this.kjid);
      obj.append("token", this.token);

      console.log(obj);
      this.$axios
        .post("https://api.it120.cc/small4/shop/goods/kanjia/join", obj)
        .then(res => {
          console.log(res);
        });
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
        console.log(this.Info);
      });
    },
    to(){
        this.$router.go(-1)
    }
  },
  computed: {
    shijian() {
      setInterval(() => {
        var Date1 = new Date();
        var Date2 = new Date("2020-7-20");
        this.haomiao = Date2 - Date1;
      }, 1000);
      var tian = parseInt(this.haomiao / 1000 / 60 / 60 / 24);
      var xiaoshi = parseInt(this.haomiao / 1000 / 60 / 60) % 24;
      var fenzhong = parseInt(this.haomiao / 1000 / 60) % 60;
      var miao = parseInt(this.haomiao / 1000) % 60;

      //   var sj = `${tian}:${xiaoshi}:${fenzhong}:${miao}`;
      var obj = new Object();
      obj.tian = tian;
      obj.xs = xiaoshi;
      obj.fz = fenzhong;
      obj.miao = miao;
      return obj;
    }
  }
};
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 6rem;
  background: linear-gradient(to right top, #e7d9bf, #b7a47c);
  .fh {
    padding: 0.2rem;
  }
  .tx {
    text-align: center;
  }
  .sp {
    width: 4.56rem;
    height: 1.28rem;
    margin: 0 auto;
    background: #f6edde;
    display: flex;
    padding: 0.1rem;
    box-sizing: border-box;
    border-radius: 10px;
    margin-top: 0.4rem;
    img {
      width: 1.1rem;
      height: 1.1rem;
    }
    p {
      line-height: 0.5rem;
    }
  }
  .sj{
      span{
          padding: 0.1rem;
          background: #B3A078;
          border-radius: 5px;
          color: white;
          font-size: 0.16rem;
      }
      p{
          text-align: center;
          margin-top: 0.3rem;
      }
  }
}
</style>
