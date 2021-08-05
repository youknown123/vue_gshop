/*
* 包含n个状态数据属性的对象*/
export default {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
    verifyCodeUrl : '',//验证码svg url
    user: {} ,//用户信息
    token: localStorage.getItem('token_key') || '' //当前用户登录的标记
}