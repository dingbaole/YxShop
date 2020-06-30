<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div id="box">
        <van-field placeholder="手机号" class="inp" v-model="mobile" right-icon="phone" />
        <van-field placeholder="密码" class="inp" 
        v-model="pwd" 
        :right-icon="pwd_show?'eye':'closed-eye'" 
        :type="pwd_show?'text':'password'" 
        @click-right-icon="pwd_show = !pwd_show" 

        />
        <van-field placeholder="确认密码" class="inp" 
        v-model="dual_pwd"
        :right-icon="dualpwd_show?'eye':'closed-eye'" 
        :type="dualpwd_show?'text':'password'" 
        @click-right-icon="dualpwd_show = !dualpwd_show" 
        />
        <van-field placeholder="用户名" class="inp" v-model="user" right-icon="manager"/>
        <van-field placeholder="图形验证码" class="inp" v-model="img_key">
           <template #button>
            <img :src="img_src" alt="" @click="shuaxin">
          </template>
        </van-field>
        <van-field placeholder="手机验证码" class="inp" v-model="mobile_key">
          <template #button>
            <van-button size="small" type="primary" @click="sendCode" :disabled="disa">{{ miao }}</van-button>
          </template>
        </van-field>
        <van-field placeholder="地区" class="inp" v-model="chengshi" right-icon="map-marked" @click="show = true"/>
        <!-- 地区滑出 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
            <van-area title="标题" :area-list="areaList" @confirm="queren" @cancel="show = false" />
        </van-popup>
        <van-button type="info" @click="zhuche" block>注册</van-button>
        <p class="denglu"><router-link to="/denglu">已有账号？登录</router-link></p>
    </div>
  </div>
</template>

<script>
import "@/assets/reset.css"
import AreaList from "@/utils/area"; //导入城市数据
export default {
  data() {
    return {
        //注册信息
        mobile:"", //手机号
        pwd:"",//密码
        dual_pwd:"",//确认密码
        user:"",//用户名
        img_key:"",//图形验证码
        mobile_key:"",//手机验证码
        chengshi:"",//城市

      //图片信息
      img_src:"",//请求图片路径
      src_key:"",//图片请求的key值

      //控制密码显示和隐藏
      pwd_show:false,
      dualpwd_show:false,

      //发送验证码
      miao:'发送验证码', //发送验证码文字
      disa:false,       //控制按钮锁定  

      //城市
      show:false,//控制滑框显示隐藏
      areaList:AreaList,//城市数据
      province:"",//省
      city:"",//市
    };
  },
  created() {},
  mounted() {
    this.img_src = "https://api.it120.cc/small4/verification/pic/get?key='111'"
  },
  methods: {

    //刷新图形验证码
    shuaxin(){
      //随机生成图片key值 
      this.src_key =  (new Date()).getTime()
      this.img_src = `https://api.it120.cc/small4/verification/pic/get?key=${this.src_key}`
    },

    //注册校验--先对表单进行校验，符合条件在触发提交注册函数
    zhuche(){
      if(this.mobile == '' || this.pwd == '' || this.user == '' || this.img_key == '' || this.mobile_key == ''){
        this.$toast.fail('手机,密码,验证码,用户不能为空');
        return false
      }
      //手机验证
      var reg = /^1[345678]\d{9}$/;
      if(!reg.test(this.mobile)){
        this.$toast.fail("请输入正确的手机号");
        return false;
      }
      //验证两次密码是否一致
      if(this.dual_pwd != this.pwd){
        this.$toast.fail("密码不一致，请重新输入");
        return false;
      }
      //校验成功
      this.tijiao()
    },

    //发送验证码倒计时
    fashong(){
      let sum = 10
      let djs = setInterval(()=>{
        this.disa = true
        if(sum<1){
          clearInterval(djs)
          this.miao = '重新发送验证码'
          this.disa = false
          return false
        }
        sum --
        this.miao = `${sum}s后再试`
      },1000)
    },

    
    //发送验证端口
    sendCode(){
      this.$axios({
        url:"https://api.it120.cc/small4/verification/sms/get",
        params:{
          mobile: this.mobile,
          key: this.src_key,
          picCode: this.img_key,
        }
      }).then(res=>{
          console.log(res);
          //校验失败的时候
          if(res.code !=0){
            this.$toast.fail(res.msg);
            return false;
          }
          this.fashong();//调用倒计时的方法
        })
    },

    //城市滑框
    //点击确认
    queren(arr){
      console.log(arr)
      let Arr = arr.map((arr)=>{
        return arr.name
      })
      this.show = false
      this.province = arr[0].name //省
      this.city = arr[1].name     //市
      this.chengshi = Arr.join('-')
    },

    //提交注册信息
    tijiao(){
      this.$axios({
        url:"https://api.it120.cc/small4/user/m/register",
        params:{
          mobile: this.mobile,
          pwd: this.pwd,
          code: this.mobile_key,
          nick: this.user,
          province: this.province,
          city: this.city
        }
      }).then(res=>{
        console.log(res)
        if(res.code != 0){
          this.$toast.fail(res.msg);
          return false
        }
        this.$toast.success("恭喜你,注册成功");
        this.$router.push("/");
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#box{
    width: 90%;
    margin: 0.1rem auto;
    padding: 0.2rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    .inp{
        border: 1px solid #dedede;
        border-radius: 0.2rem;
        margin-bottom: 0.2rem;
    }
    img{
      width: 3rem;
    }
    .denglu{
        margin-top: 0.2rem;
    }
}

</style>
