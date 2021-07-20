/*对axios进行二次封装
* 1.统一处理请求异常
* 2.成功的结果不再是response, 而是response.data
* 3.处理Post请求参数(从对象转换为urlencoding)而不使用默认的json格式 后台接口不支持JSOn
* 4.配置请求超时时间
* 5.通过请求头携带token数据*/
import axios from 'axios'
import qs from 'qs'
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
    const data = config.data
    if (data instanceof Object) {
        config.data = qs.stringify(data)
    }
    return config
})
//添加响应拦截器
instance.interceptors.response.use(
    response => {
        console.log('req interceptors')
        // 2.成功的结果不再是response, 而是response.data
        return response.data
    },
    error => {
        alert('error:  ' + error.message)
        //1.统一处理请求异常
        return new Promise(() => {

        })  //返回一个pending状态的promise 来中断promise链
    }
)

export default instance