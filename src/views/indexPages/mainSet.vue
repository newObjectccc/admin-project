<template>
<div class="">
    <div class="wrap">
        <el-input class="margin-right" v-model="userID" placeholder="请输入用户ID"></el-input>
        <el-button size="small" type="primary" @click="searchAssets">查询用户</el-button>
    </div>

    <template v-if="tableData !== []">
            <el-table :data="tableData" style="width: 100%">
            <el-table-column label="用户ID" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户电话" width="170">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="资产" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Status }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="frozenAssets(scope.row)">冻结资产</el-button>
                    <el-button size="mini" type="danger" @click="handleAssets(scope.row)">修改资产</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>
</div>
</template>

<script>
export default {
    data() {
        return {
            userID: '',
            tableData: []
        }
    },
    mounted() {

    },
    methods: {
        getConfig() {
            this.$axios({
                url: '/userassets',
				method: 'GET',
				headers: {
					Authorization: this.$store.state._token
				},
                params: {
                    ID: this.userID
                }
            }).then((res) => {
                console.log(res);
            })
        },
        handleAssets(row) {
            this.$axios({
                url: '/userassetsmomeny',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    ID: row.ID
                }
            }).then(res => {
                console.log(res);
            })
        },
        frozenAssets(row) {
            let curStatus = row.Status === 1 ? 2 : 1
            this.$axios({
                url: '/userassetsstatus',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Status: curStatus,
                    ID: row.ID
                }
            }).then(res => {
                console.log(res);
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .margin-large {
        display: block;
        margin: 20px 0;
        font-size: 18px;
    }
    .margin {
        display: block;
        margin: 10px 0;
    }
    .margin span {
        font-size: 15px;
    }
    .wrap {
        width: 30%;
        display: flex;
        align-items: center;
    }
    .margin-right {
        margin-right: 20px;
    }
</style>
