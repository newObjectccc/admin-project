<template>
<div class="app-wrapper">
    <div class="header">
        <img class="header-img" src="~@/assets/logo.png">
        <navBar />
    </div>
    <div class="wrap">
        <sideBar class="sidebar-container" />
        <div class="main-container">
            <breadCrumb />
            <appMain />
        </div>
    </div>
</div>
</template>

<script>
import appMain from './modules/appMain.vue'
import navBar from './modules/navBar.vue'
import sideBar from './modules/sideBar.vue'
import breadCrumb from './modules/breadCrumb.vue'
export default {
    name: 'layout',
    components: {
        appMain,
        navBar,
        sideBar,
        breadCrumb
    }
}
</script>

<style lang="css" scoped>
    #app .app-wrapper {
        width: 100%;
        height: 50px;
    }
    #app .header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #21A0FF;
        padding: 0 10px;
    }
    #app .header .header-img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
    #app .sidebar-container {
        width: 15%;
        height: calc(100vh - 50px);
    }
    #app .wrap {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
    }
    #app .main-container {
        padding: 10px;
    }
</style>
