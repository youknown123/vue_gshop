import Vue from 'vue'
import VueRouter  from 'vue-router'
import Msite from "../pages/Msite/Msite";
import Search from "../pages/Search/Search";
import Order from "../pages/Order/Order";
import Personal from "../pages/Personal/Personal";
import Login from "../pages/Login/Login";

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history'
    ,
    routes:[
        {
            path: '/msite',
            component: Msite,
            //路由元信息
            meta:{
                isShowFooter:true
            }
        },
        {
            path: '/search',
            component: Search,
            meta:{
                isShowFooter:true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
                isShowFooter:true
            }
        },
        {
            path: '/personal',
            component: Personal,
            meta:{
                isShowFooter:true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            redirect:'/msite'
        }
    ]
})
