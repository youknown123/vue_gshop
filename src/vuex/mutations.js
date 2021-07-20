/*
* 包含n个立即改变state状态属性方法的对象*/
import {RECEIVE_SHOPS,RECEIVE_CATAGORYS,RECEIVE_ADDRESS} from "./mutation-types";

export default {
    [RECEIVE_ADDRESS](state,address){
        state.address = address
    },
    [RECEIVE_CATAGORYS](state,categorys){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
        state.shops = shops
    }
}