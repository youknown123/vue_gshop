/*
包含n个用于直接更新state的方法的对象
可以包含异步和逻辑处理代码
* */
import {
    reqAddress,
    reqCategorys,
    reqShops
} from "../api";
import {RECEIVE_ADDRESS,RECEIVE_CATAGORYS,RECEIVE_SHOPS} from "./mutation-types";

export default {
    //获取当前地址的异步action
    async getAddress({commit,state}){
        //发异步请求
        const {longitude,latitude} = state
        const result = await reqAddress(longitude,latitude)
        if(result.code===0){
            const address = result.data.address
            //请求成功后 提交mutation
            commit(RECEIVE_ADDRESS,address)
        }

    },
    //获取食品分类列表的异步action
    async getCategorys({commit,state}){
        const result = await reqCategorys()
        if(result.code===0){
            const categorys = result.data
            //请求成功后 提交mutation
            commit(RECEIVE_CATAGORYS,categorys)
        }

    },
    //获取商铺列表的异步action
    async getShops({longitude,latitude}){
        const result = await reqShops({longitude,latitude})
        if(result.code===0){
            const shops = result.data
            commit(RECEIVE_SHOPS,shops)
        }
    }
}