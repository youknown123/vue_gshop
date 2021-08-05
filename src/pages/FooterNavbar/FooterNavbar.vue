<template>
    <div class="foot-navbar">
        <ul class="foot-list">
            <li @click="goto('/msite')" :class="{'click-active':$route.path==='/msite'}">
                <span class="iconfont icon-u"></span>
                <span>首页</span>
            </li>
            <li @click="goto('/search')" :class="{'click-active':$route.path==='/search'}">
                <span class="iconfont icon-sousuo"></span>
                <span>搜索</span>
            </li>
            <li @click="goto('/order')" :class="{'click-active':$route.path==='/order'}">
                <span class="iconfont icon-dingdan1"></span>
                <span>订单</span>
            </li>
            <li @click="goto('/personal')" :class="{'click-active':$route.path==='/personal'}">
                <span class="iconfont icon-wodedangxuan"></span>
                <span>我的</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            goto(path) {
                //方案1：点击当前项 没有效果
                // if (path !== this.$route.path) this.$router.replace(path)
                //方案2：点击当前项 刷新页面
                if(path !== this.$route.path){
                    this.$router.replace(path)
                }else{
                    window.location = path //发送一般的http 请求 整个页面会刷新显示
                }
            }
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .foot-navbar
        top-border-1px(#cccccc)
        position fixed
        left 0
        bottom 0
        width 100%
        height 60px
        background-color #ffffff
        .foot-list
            display flex
            li
                width 25%
                display flex
                flex-direction column
                align-items center
                span:first-child
                    margin-top 10px
                    margin-bottom 10px
                    font-size 20px
                span:nth-of-type(2)
                    font-size 16px
                &.click-active
                    color #02a774



    /*@media screen and (-webkit-device-pixel-ratio: 2){*/
    /*    .foot-navbar{*/
    /*        border-top: 0.01rem;*/
    /*        border-bottom:0.01rem;*/
    /*    }*/
    /*}*/
   /* @media screen and (-webkit-device-pixel-ratio: 1){
        .foot-navbar{
            border-top: 0.01rem solid #cccccc;
            border-bottom:0.01rem solid #cccccc;
        }
    }
    @media screen and (-webkit-device-pixel-ratio: 2){
        .foot-navbar{
            border-top: 0.005rem solid #cccccc;
            border-bottom:0.005rem solid #cccccc;
        }
    }
    @media screen and (-webkit-device-pixel-ratio: 3){
        .foot-navbar{
            border-top: 0.0033rem solid #cccccc;
            border-bottom:0.0033rem solid #cccccc;
        }
    }*/
</style>
<!--<style lang="less" scoped>-->


<!--</style>-->