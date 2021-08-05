/*包含n个请求接口函数的模块*/
import ajax from './ajax'

// 1根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => {
    return ajax(`/position/${latitude},${longitude}`)
}
//[2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category',{
    headers: {
        needCheck: true
    }
})
//3.根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) => ajax('/shops', {
    params: {longitude, latitude},
    //需要进行token的校验
    headers: {
        needCheck: true
    }
})
/*
4、发送短信验证码
*/
export const reqSendCode = (phone) => ajax.get("/sendcode", {
        params: {
            phone
        }
    }
)
//// 5.用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax.post('/login_pwd',{
    name,pwd,captcha
})
// 6. 手机号验证码登陆
export const reqSmsLogin = ({phone,code}) => ajax.post('login_sms',{
    phone,code
})
// 7. 自动登陆