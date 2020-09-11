<template>
    <el-menu v-if="!isChild" id="submenu" :router="true" :default-active="$route.path" background-color="#545C64" text-color="#FFFFFF" :unique-opened="false" active-text-color="#88B478" :collapse-transition="false">
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.path + index">
            <template slot="title">
                <i :class="item.meta.class"></i>
                <span>{{item.meta.title}}</span>
            </template>
            <template v-if="item.children !== []">
                <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="'sub' + subIndex">
                    <el-menu-item :index="subItem.path">{{item.meta.title}}</el-menu-item>
                    <subMenu :menuList="subItem.children" :isChild="true"></subMenu>
                </el-menu-item-group>
            </template>
        </el-submenu>
    </el-menu>
    <div v-else>
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.path">
            <template slot="title">
                <i :class="item.meta.class"></i>
                <span>{{item.meta.title}}</span>
            </template>
            <template v-if="item.children !== []">
                <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="'sub' + subIndex">
                    <el-menu-item :index="subItem.path">{{item.meta.title}}</el-menu-item>
                    <subMenu :menuList="subItem.children" :isChild="true"></subMenu>
                </el-menu-item-group>
            </template>
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: 'subMenu',
    props: {
        menuList: {
            type: Array,
            default() {
                return []
            }
        },
        isChild: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    created() {
        console.log('menulist',this.menuList)
        console.log('routes',this.$route.path)
        console.log('path',this.menuList[0].path)
    }
}
</script>
<style scoped>
.scrollbar-wrapper {
    height: 100vh;
}
#submenu {
    color: #ffffff;
    height: calc(100vh - 50px);
}
</style>
