<template>
    <subMenu :menuList="menuList"></subMenu>
</template>

<script>
import subMenu from './subMenu.vue'
export default {
    components: {
        subMenu
    },
    data() {
        return {
            menuList: []
        }
    },
    created() {
        this.getMenuList()
    },
    methods: {
        getMenuList() {
            this.menuList = this.$router.options.routes;
            this.menuList.shift();
        }
    }
}
</script>

<style lang="css" scoped>

</style>
