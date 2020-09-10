<template>
    <el-menu id="submenu" default-active="1" background-color="#545C64" text-color="#FFFFFF" :unique-opened="false" active-text-color="#C66732" :collapse-transition="false">
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="index">
            <template slot="title">
                {{item.meta.title}}
            </template>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
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
            console.log(this.menuList);
        }
    }
}
</script>

<style lang="css" scoped>
    .scrollbar-wrapper {
        height: 100vh;
    }
    #submenu {
        color: #ffffff;
        height: calc(100vh - 50px);
    }
</style>
