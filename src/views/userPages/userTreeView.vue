<template>
<div class="">
    <div class="wrap">
        <el-input class="margin-right" v-model="userID" placeholder="请输入用户ID"></el-input>
        <el-button size="small" type="primary" @click="searchUserID">查询用户</el-button>
    </div>
    <div class="wrap-column">
        <el-input class="width" placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>

        <el-tree class="filter-tree" :indent="20" :data="data2" :highlight-current="true" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2">
        </el-tree>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            userID: '',
            filterText: '',
            data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    created() {
        this.searchUserID()
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        searchUserID() {
            this.$axios({
                url: '/userinviters',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Inviter: ''
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    // sss
                } else {
                    this.$message.error('操作失败！')
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
.wrap {
    width: 30%;
    display: flex;
    align-items: center;
}
.wrap-column {
    width: 100%;
    margin-top: 40px;
}
.width {
    width: 30%;
    margin-bottom: 10px;
}
.margin-right {
    margin-right: 20px;
}
</style>
