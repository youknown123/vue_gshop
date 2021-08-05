/*
* 包含n个立即改变state状态属性方法的对象*/
import {RECEIVE_SHOPS,RECEIVE_CATAGORYS,RECEIVE_ADDRESS,RECEIVE_USER,RECEIVE_TOKEN} from "./mutation-types";

export default {
    [RECEIVE_ADDRESS](state,address){
        state.address = address
    },
    [RECEIVE_CATAGORYS](state,categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops = shops
    },
    [RECEIVE_USER](state, {user}){
        state.user = user
    },
    [RECEIVE_TOKEN](state, {token}){
        state.token = token
    }
}