import Vue from 'vue'
import VueRouter  from 'vue-router'
import Msite from "../pages/Msite/Msite";
import Search from "../pages/Search/Search";
import Order from "../pages/Order/Order";
import Personal from "../pages/Personal/Personal";

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history'
    ,
    routes:[
        {
            path: '/msite',
            component: Msite
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/personal',
            component: Personal
        },
        {
            path: '/',
            redirect:'/msite'
        }
    ]
})
