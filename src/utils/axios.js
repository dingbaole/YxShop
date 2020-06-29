import axios from "axios"

var sever = axios.create({
    baseURL:'',
    timeout:3000
})

// 请求拦截器
sever.interceptors.request.use(function(config){
    return config
},function(err){
    return err
})

// 响应拦截器
sever.interceptors.response.use(function(repones){
    return repones
},function(err){
    return err
})

export default sever