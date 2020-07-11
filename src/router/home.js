import home from '@/views/home/home'
import cat from '@/views/home/cat'
import me from '@/views/home/me'
import app from '@/views/home/app'

var Home = [
    {
        path:"/home",
        name:"home",
        component:home,
        meta:{
            title:"首页"
        }
    },
    {
        path:"/app",
        name:"app",
        component:app,
        meta:{
            title:"分类"
        }
    },
    {
        path:"/me",
        name:"me",
        component:me,
        meta:{
            title:"我的"
        }
    },
    {
        path:"/cat",
        name:"cat",
        component:cat,
        meta:{
            title:"购物车"
        }
    },
]

export default Home