/*
包含n个用于直接更新state的方法的对象
可以包含异步和逻辑处理代码
* */
import {
    reqAddress,
    reqCategorys,
    reqShops,
} from "../api";
import {RECEIVE_ADDRESS,RECEIVE_CATAGORYS,RECEIVE_SHOPS,RECEIVE_TOKEN,RECEIVE_USER} from "./mutation-types";

export default {
    //获取当前地址的异步action
    async getAddress({commit,state}){
        //发异步请求
        const {longitude,latitude} = state
        const result = await reqAddress(longitude,latitude)
        if(result.code===0){
            const address = result.data
            //请求成功后 提交mutation
            commit(RECEIVE_ADDRESS,address)
        }

    },
    //获取食品分类列表的异步action
    async getCategorys({commit},callback){
        const result = await reqCategorys()
        if(result.code===0){
            const categorys = result.data
            //请求成功后 提交mutation
            commit(RECEIVE_CATAGORYS,categorys)
            //请求成功后调用自定义的回调函数
            typeof callback === "function" && callback()
        }

    },
    //获取商铺列表的异步action
    async getShops({commit,state}){
        const {longitude,latitude} = state
        const result = await reqShops({longitude,latitude})
        if(result.code===0){
            const shops = result.data
            commit(RECEIVE_SHOPS,shops)
        }
    },
    //保存用户登录信息的
    saveUser({commit},user){
        const token = user.token
        // 将token保存local
        localStorage.setItem('token_key',token)
        // 删除user内部的token
        delete user.token
        // 将user保存到state
        commit(RECEIVE_USER,{user})
        // 将token保存到state
        commit(RECEIVE_TOKEN, {token})
    },
    //token失效清除用户登录信息
    logout({commit}){
        localStorage.removeItem('token_key')
        //将store中的state的user token置空
        commit(RECEIVE_USER)
        commit(RECEIVE_TOKEN)
    }
}