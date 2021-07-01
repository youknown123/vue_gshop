<template>
    <div id="wrap">
        <div class="header"></div>
        <router-view></router-view>
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

    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {}
        },
        methods: {
            goto(path) {
                if (path !== this.$route.path) this.$router.replace(path)

            }
        },
        mounted() {
            console.log(window.devicePixelRatio)
        }
    }
</script>
<style lang="less" scoped>
    /*.border-top-1px::before{*/
    /*    content: "";*/
    /*    display: block;*/
    /*    width: 100%;*/
    /*    height: 0.01rem;*/
    /*}*/
    #wrap{
        font-size: 0.12rem;
        .foot-navbar {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 0.6rem;
            border-top: 0.01rem solid #cccccc;
            border-bottom: 0.01rem solid #cccccc;
            .foot-list {
                display: flex;


                li {
                    width: 0.9375rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    span:first-child {
                        margin-top: 0.1rem;
                        margin-bottom: 0.1rem;
                        font-size: 0.2rem;
                    }

                    span:nth-of-type(2) {
                        font-size: 0.16rem;
                    }

                    &.click-active {
                        color: #02a774;
                    }
                }
            }

        }

        /*@media screen and (-webkit-device-pixel-ratio: 2){*/
        /*    .foot-navbar{*/
        /*        border-top: 0.01rem;*/
        /*        border-bottom:0.01rem;*/
        /*    }*/
        /*}*/
        @media screen and (-webkit-device-pixel-ratio: 1){
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
        }
        /*@media screen and (-webkit-min-device-pixel-ratio: 2){*/
        /*    .foot-navbar{*/
        /*                border-top: 0.01rem;*/
        /*                border-bottom:0.01rem;*/
        /*    }*/
        /*}*/
    }


</style>