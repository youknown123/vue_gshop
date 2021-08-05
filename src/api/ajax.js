/*对axios进行二次封装
* 1.统一处理请求异常
* 2.成功的结果不再是response, 而是response.data
* 3.处理Post请求参数(从对象转换为urlencoding)而不使用默认的json格式 后台接口不支持JSOn
* 4.配置请求超时时间
* 5.通过请求头携带token数据*/
import axios from 'axios'
import qs from 'qs'
import {Indicator,MessageBox,Toast} from 'mint-ui'
import store from '../vuex/store'
import router from '../router'

// const baseUrl = 'http://localhost:4000'
const instance = axios.create({
    // baseURL:'http://localhost:4000',  //跨域
    baseURL:'/api', //让代理服务器转发请求4000
    timeout: 10000,
})
//请求拦截器
instance.interceptors.request.use((config) => {
    // 3.处理Post请求参数(从对象转换为urlencoding)而不使用默认的json格式 后台接口不支持JSOn
    console.log('req interceptors')
    //启动加载框
    Indicator.open()
    const data = config.data
    if (data instanceof Object) {
        config.data = qs.stringify(data)
    }
    // 5. 通过请求头携带token数据
    const token = store.state.token
    // 有token就携带
    if(token){
        config.headers['Authorization'] = token
    }else{
        // 如果当前接口需要token校验, 但没有token, 不发请求, 进入错误流程
        const needCheck = config.headers.needCheck
        // 如果没有token, 但又需要token校验, 不能发请求
        if(needCheck){
            throw new Error('没有登录 不能请求')
        }
    }


    return config
})
//添加响应拦截器
instance.interceptors.response.use(
    response => {
        console.log('req interceptors')
        //关闭加载框
        Indicator.close()
        // 2.成功的结果不再是response, 而是response.data
        return response.data
    },
    error => {
        alert('error:  ' + error.message)
        Indicator.close()
        const response = error.response
        //没法请求的错误
        if(!response){
            const path = router.currentRoute.path
            if(path!=='/login'){
                router.replace('/login')
                Toast(error.message)
            }
        }else{ //发了请求的错误
            // status为: 401: token过期了, 退出登陆(清除local中的token和state中user与token), 并跳转到登陆页面

            if(error.response.status===401){
                const path = router.currentRoute.path
                if (path!=='/login'){
                    //退出登录
                    store.dispatch('logout')
                    router.replace('/login')
                    Toast(error.response.status.data.message || '登录失效 请重新登录')
                }
            }else if(error.response.status===404){// status为: 404: 提示访问的资源不存在
                MessageBox('提示','访问的资源不存在')
            }else{
                //1.统一处理请求异常
                MessageBox('提示','请求出错，'+ error.message)
            }

        }

        return new Promise(() => {})  //返回一个pending状态的promise 来中断promise链
    }
)

export default instance