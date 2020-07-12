import axios from "axios"
import store from '@/store/index';

var sever = axios.create({
    baseURL:'',
    timeout:3000
})

// 请求拦截器
sever.interceptors.request.use(function(config){
    store.commit('getlongding',true)
    return config
},function(err){
    
})

// 响应拦截器
sever.interceptors.response.use(function(repones){
    console.log(repones)
    //判断接口返回的数据成功，直接返回数据中data数据
    if(repones.status == 200){
        setTimeout(()=>{
            store.commit('getlongding',false)
        },1500)
        return repones.data
    }
    return repones
},function(err){
    return Promise.reject(err)
})

export default sever