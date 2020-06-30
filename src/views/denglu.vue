<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" left-arrow />
    <div id="box">
      <van-field placeholder="手机号" class="inp" v-model="mobile" right-icon="phone" />
      <van-field
        placeholder="密码"
        class="inp"
        v-model="pwd"
        :right-icon="pwd_show?'eye':'closed-eye'"
        :type="pwd_show?'text':'password'"
        @click-right-icon="pwd_show = !pwd_show"
      />
      <van-button type="info" block @click="checkLogin">登录</van-button>
      <p class="denglu">
        <router-link to="/zhuche">没有账号？注册账号</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import "@/assets/reset.css";
import storage from "@/utils/storage"
export default {
  data() {
    return {
      mobile: "", //手机号
      pwd: "", //密码

      pwd_show: false //显示隐藏密码
    };
  },
  beforeRouteEnter(to,form,next){
      let data = storage.get('09A_user',true)
      if(data !=null){
          next('/')
      }else{
          next()
      }
      
  },
  methods: {
    //登录校验，校验成功调用请求登录方法
    checkLogin() {
        // 验证不为空
      if (this.mobile == "" || this.pwd == "") {
        this.$toast.fail("手机号或密码不能为空");
        return false;
      }
        // 验证手机格式
      var reg = /^1[345678]\d{9}$/;
      if (!reg.test(this.mobile)) {
        this.$toast.fail("请输入正确的手机号");
        return false;
      }

      this.doLogin();//调用执行登陆的方法
    },
    //请求登录接口
    doLogin(){
        this.$axios({
            url: "https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
            params:{
                mobile: this.mobile,
                pwd: this.pwd
            }
        }).then(res=>{
            console.log(res)
            if(res.code != 0){
                this.$toast.fail(res.msg);
                return false
            }
            let user = {
                uid:res.data.uid,
                token:res.data.token,
                mobile:this.mobile
            }
            storage.set('09A_user',user,true)

            this.$toast.success("用户登陆成功");
        })
    }
  }
};
</script>

<style lang='scss' scoped>
#box {
  width: 90%;
  margin: 0.1rem auto;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  .inp {
    border: 1px solid #dedede;
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
  }
  img {
    width: 3rem;
  }
  .denglu {
    margin-top: 0.2rem;
  }
}
</style>
