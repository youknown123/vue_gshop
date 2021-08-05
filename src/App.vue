<template>
    <div id="wrap">
        <router-view></router-view>
        <FooterNavbar v-show="$route.meta.isShowFooter"></FooterNavbar>

    </div>
</template>
<script>
    import FooterNavbar from "./pages/FooterNavbar/FooterNavbar";

    export default {
        name: 'app',
        components: {
            FooterNavbar
        },
        data() {
            return {}
        },
        async mounted() {
            const result = await this.$store.dispatch('getAddress')
            console.log('result',result)
        }

    }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
    #wrap
        width 100%
        height 100%
</style>