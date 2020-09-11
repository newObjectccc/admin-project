<template lang="html">
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            key: ''
        }
    },
    watch: {
        $route() {
            console.log(this.$route.path)
            this.key = this.$route.path;
        }
    },
    created() {

    }
}
</script>

<style lang="css" scoped>

</style>
