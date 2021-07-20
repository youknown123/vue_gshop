<template>
    <div id="wrap">
        <div class="header">{{$store.state.address}}</div>
        <router-view></router-view>
        <FooterNavbar></FooterNavbar>

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