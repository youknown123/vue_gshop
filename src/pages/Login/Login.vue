<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on : isShowMessage}" @click="isShowMessage=true">短信登录</a>
                    <a href="javascript:;" :class="{on : !isShowMessage}" @click="isShowMessage=false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on : isShowMessage}">
                        <section class="login_message">
<!--                            <input type="tel" maxlength="11" placeholder="手机号"  v-model="phone" @input="testPhonenumber" v-validate="'required|email'">-->
                            <input type="tel" maxlength="11" placeholder="手机号"  v-model="phone" @input="testPhonenumber" name="phone" v-validate="'required|mobile'">

<!--                            <p v-show="isErrorTextShow" style="color:red; font-size: 12px">请输入正确格式的手机号</p>-->
                            <button :disabled="isErrorTextShow" class="get_verification" :class="{on : !isErrorTextShow}" @click.prevent="getCode" v-if="!isSendMsg">获取验证码</button>
                            <p class="get_verification" v-else>短信已发送<span>{{timeCount}}</span>s</p>
                            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}">
                            <span style="color:red;" v-show="errors.has('code')">{{errors.first('code')}}</span>
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on : !isShowMessage}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" name="name" v-model="name" v-validate="'required'">
                                <span style="color:red;" v-show="errors.has('name')">{{errors.first('name')}}</span>
                            </section>
                            <section class="login_verification">
                                <input :type="isPwdShow ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd" name="pwd" v-validate="'required'">
                                <div class="switch_button " :class="isPwdShow ? 'on' : 'off'" @click="isPwdShow=!isPwdShow">
                                    <div class="switch_circle"></div>
                                    <span class="switch_text" v-show="isPwdShow">abc</span>
                                </div>
                                <span style="color: red;" v-show="errors.has('pwd')">{{errors.first('pwd')}}</span>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" name="captcha" v-model="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                                <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="changeCaptcha">
                                <span style="color:red;"  v-show="errors.has('captcha')">{{errors.first('captcha')}}</span>
                            </section>
                        </section>
                    </div>
                    <button class="login_submit" @click.prevent="login">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou2"></i>
            </a>
        </div>
    </section>
</template>

<script>
    import {Toast,MessageBox} from 'mint-ui'

    export default {
        data() {
            return {
                //
                phone: '', // 手机号
                code: '', // 短信验证码
                name: '', // 用户名
                pwd: '', // 密码
                captcha: '', // 图形验证码


                //是否显示短信登录
                isShowMessage : true,
                // phoneNumber:'',
                //是否显示提示错误文字
                isErrorTextShow:true,
                //密码显示是否打开 默认为关
                isPwdShow : false,
                //是否已经发送短信验证码
                isSendMsg : false,
                //倒计时时间60s
                timeCount : 10
            }
        },
        methods:{
            //测试手机号是否符合格式
            testPhonenumber(){
                let reg = /^1[\d]{10}$/
                // //函数防抖
                // let timeOutId = setTimeout(()=>{
                //
                // })
                this.isErrorTextShow = !reg.test(this.phone)
            },
            //获取验证码
            async getCode(){
                this.isSendMsg = true
                //开始倒计时
                let intervalID = setInterval(() => {
                    this.timeCount--
                    if (this.timeCount === 0){
                        clearInterval(intervalID)
                        this.timeCount = 10
                        this.isSendMsg = false
                    }
                },1000)
                setTimeout(()=>{

                },5000)
                const result = await this.$API.reqSendCode(this.phone)
                console.log(result)
                if (result.code===0){
                    Toast('短信发送成功')
                }else {
                    this.isSendMsg = false
                    clearInterval(intervalID)
                    this.timeCount = 10
                    MessageBox('提示',result.msg || '发送失败')
                }

                //如果请求返回code为0则将issendMsg 设为false

            },
            //获取一次性验证码
            changeCaptcha(){
                this.$refs.captcha.src = 'http://localhost:4000/captcha/?' + Date.now()
            },
            //登录
            async login(){
                // 进行前台表单验证
                let names
                if(this.isShowMessage){
                    names = ['phone','code']
                }else{
                    names = ['name','pwd','captcha']
                }
                // 对指定的所有表单项进行验证
                const success = await this.$validator.validateAll(names)
                // 如果验证通过, 发送登陆的请求
                let result
                const {phone,code,pwd,captcha,name,isShowMessage} = this
                if(success){
                    if(isShowMessage){
                        //短信登录
                        result = await this.$API.reqSmsLogin({phone,code})
                    }else{
                        // 密码登陆
                        result = await this.$API.reqPwdLogin({name,pwd,captcha})
                        // 更新图形验证码
                        this.changeCaptcha()
                        this.captcha = ''
                    }
                    // 根据请求的结果, 做不同响应处理
                    if(result.code===0){
                        const user = result.data
                        console.log('user---------',user)
                        //将user保存到vuex的state
                        this.$store.dispatch('saveUser',user)// 将user和token保存到state, 将token保存local
                        // 跳转到个人中心
                        this.$router.replace('/personal')
                    }else{
                        MessageBox('提示',result.msg)
                    }
                }






            }
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff

        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto

            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center

                .login_header_title
                    padding-top 40px
                    text-align center

                    > a
                        color #333
                        font-size 14px
                        padding-bottom 4px

                        &:first-child
                            margin-right 40px

                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774

            .login_content
                > form
                    > div
                        display none

                        &.on
                            display block

                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial

                            &:focus
                                border 1px solid #02a774

                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff

                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.on
                                    color #02a774
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff

                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s, border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)

                                &.off
                                    background #fff

                                    .switch_text
                                        float right
                                        color #ddd

                                &.on
                                    background #02a774
                                    .switch_circle
                                        transform translateX(27px)
                                > .switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                                    transition transform .3s

                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px

                            > a
                                color #02a774

                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0

                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999

            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px

                > .iconfont
                    font-size 20px
                    color #999

</style>