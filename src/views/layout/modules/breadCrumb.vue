<template>
<div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: curRoutePath }">{{curRoute}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
    data() {
        return {
            curRoutePath: '',
            curRoute: ''
        }
    },
    created() {
        this.curRoutePath = this.$route.path;
        this.curRoute = this.$route.meta.title;
    },
    watch: {
        $route() {
            this.curRoutePath = this.$route.path;
            this.curRoute = this.$route.meta.title;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
