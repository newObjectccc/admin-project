<template>
<div class="">
    <div class="wrap">
        <el-input class="margin-right" v-model="userID" placeholder="请输入用户电话号码"></el-input>
        <el-button size="small" type="primary" @click="searchUserID">查询用户</el-button>
    </div>
    <div class="wrap-column">
        <el-tree class="filter-tree" :indent="20" @node-expand="loadNode" :data="dataTree" :highlight-current="true" :props="defaultProps" ref="tree2">
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
            dataTree: [],
            defaultProps: {
                isLeaf: true,
                label: 'Phone',
                children: 'children'
            }
        };
    },
    created() {
        this.searchUser()
    },
    methods: {
        searchUserID() {
            if (!this.userID) {this.searchUser(); return false}
            this.$axios({
                url: '/userinviters',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Inviter: this.userID
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.dataTree = []; // 针对性搜索，需要重置data
                    res.data.Data.map((item) => {
                        item.children = [{Phone:'暂无'}];
                        this.dataTree.push(item)
                    })
                } else {
                    this.$message.error('操作失败！')
                }
            })
        },
        searchUser(e='') {
            this.$axios({
                url: '/userinviters',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Inviter: e
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    res.data.Data.map((item) => {
                        item.children = [{Phone:'暂无'}];
                        this.dataTree.push(item)
                    })
                } else {
                    this.$message.error('操作失败！')
                }
            })
        },
        loadNode(data) {
            if (data.children[0].Phone !== '暂无') {
                // 已经加载过数据了
                console.log(11);
                return false
            }
            this.$axios({
                url: '/userinviters',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Inviter: data.Phone
                }
            }).then((res) => {
                if (res.status === 200) {
                    if (data.children[0].Phone === '暂无' && res.data.Data !== null) {
                        // 第一次展开，成功加载数据，去掉 ‘暂无’
                        data.children = []
                    }
                    res.data.Data.map((item) => {
                        item.children = [{Phone:'暂无'}];
                        data.children.push(item)
                    })
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
