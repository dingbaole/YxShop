var storage = {
    set:function(key,value,isJon = false){
        // 判断是否为空
        if(key.length == 0 || value.length == 0 ){
            return false
        }
        // 判断是否需要吧json格式转换成字符串,true转换,false不转换
        let data = (isJon==true?JSON.stringify(value):value)
        // 设置本地存储
        localStorage.setItem(key,data)
    },
    get:function(key,isJon = false){
        // 判断是否为空
        if(key.length == 0){
            return false
        }
        // 获取本地存储
        let data = localStorage.getItem(key)
        // 判断获取到的本地存储是否需要吧字符串格式转换成json格式,最后吧获取到的值return返回
        return isJon == true ? JSON.parse(data):data
    },
    remove:function(key){
        // 判断是否为空
        if(key.length==0){
            return false
        }
        // 删除本地存储
        localStorage.removeItem(key)
    }
}

// 导出
export default storage