import axios from "axios"

var sever = axios.create({
    baseURL:'',
    timeout:3000
})

// 请求拦截器
sever.interceptors.request.use(function(config){
    return config
},function(err){
    
})

// 响应拦截器
sever.interceptors.response.use(function(repones){
    console.log(repones)
    //判断接口返回的数据成功，直接返回数据中data数据
    if(repones.status == 200){
        return repones.data
    }
    return repones
},function(err){
    return Promise.reject(err)
})

export default sever