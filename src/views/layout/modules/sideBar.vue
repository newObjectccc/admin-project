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
            if (this.menuList[0].path.indexOf('login') !== -1) {
                this.menuList.shift();
            }
        }
    }
}
</script>

<style lang="css" scoped>

</style>
