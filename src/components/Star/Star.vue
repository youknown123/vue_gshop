<template>
    <div class="star star-24" >
        <span class="star-item" :class="sc.state" :key="index" v-for="(sc,index) in starClass"></span>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        mounted() {

        },
        props:['rating'],
        computed:{
            //根据不同的状态的星星的个数 组成一个数组
            starClass(){
                let scArr = []
                //on 类型的个数
                let onNum =  Math.floor(this.rating * 1 / 1)
                //半个类型个数 有或者没有
                let halfNum = this.rating * 1 % 1 === 0 ? 0 : 1
                //off类型的个数
                let offNum = 5 - onNum - halfNum
                //将这些装进数组中

                for (let i = 0;i < onNum;i++){
                    let obj = {}
                    obj.state = 'on'
                    scArr.push(obj)
                }
                for(let i = 0;i < halfNum;i++){
                    let obj = {}
                    obj.state = 'half'
                    scArr.push(obj)
                }
                for(let i = 0;i < offNum;i++){
                    let obj = {}
                    obj.state = 'half'
                    scArr.push(obj)
                }
                return scArr
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .star //2x图 3x图
        float left
        font-size 0

        .star-item
            display inline-block
            background-repeat no-repeat

        &.star-48
            .star-item
                width 20px
                height 20px
                margin-right 22px
                background-size 20px 20px
                &:last-child
                    margin-right: 0

                &.on
                    bg-image('./images/stars/star48_on')

                &.half
                    bg-image('./images/stars/star48_half')

                &.off
                    bg-image('./images/stars/star48_off')

        &.star-36
            .star-item
                width 15px
                height 15px
                margin-right 6px
                background-size 15px 15px

                &:last-child
                    margin-right 0

                &.on
                    bg-image('./images/stars/star36_on')

                &.half
                    bg-image('./images/stars/star36_half')

                &.off
                    bg-image('./images/stars/star36_off')

        &.star-24
            .star-item
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px

                &:last-child
                    margin-right 0

                &.on
                    /*background-image url("./images/stars/star24_on@2x.png")*/
                    bg-image('./images/stars/star24_on')

                &.half
                    bg-image('./images/stars/star24_half')

                &.off
                    bg-image('./images/stars/star24_off')

</style>