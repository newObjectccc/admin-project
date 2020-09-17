<template>
<div class="">
    <el-input class="margin-right" v-model="userIdValue" placeholder="输入UserID进行筛选(用户ID)"></el-input>
    <el-button size="small" type="primary" @click="getPageData">筛选查询</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户ID" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.UserID }}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户电话" width="170">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Phone }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Email" width="200">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Email }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Status === 1 ? '正常' : '已冻结' }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button v-if="scope.row.Status === 1" size="mini" type="danger" @click="frozenAccount(scope.row, 2)">冻结用户</el-button>
                <el-button v-else size="mini" type="success" @click="frozenAccount(scope.row, 1)">解结用户</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div id="pagination" class="block">
        <el-pagination
            :current-page.sync="curPage"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="totalRows"
        >
        </el-pagination>
    </div>

</div>
</template>

<script>
export default {
    name: 'userSet',
    data() {
        return {
            userIdValue: '',
            tableData: [],
            curPage: 1,
            totalRows: 20
        }
    },
    created() {
        this.getPageData()
    },
    methods: {
        getPageData() {
            this.$axios({
                url: '/userpage',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Offset: (this.curPage - 1) * 20,
                    Limit: 20,
                    UserID: this.userIdValue
                }
            }).then((res) => {
                console.log(res);
                this.tableData = res.data.Data.Rows
                this.totalRows = res.data.Data.Page.TotalRows
            })
        },
        handleCurrentChange() {
            console.log(this.curPage);
            this.getPageData();
        },
        frozenAccount(row, type) {
            console.log(row);
            this.$axios({
                url: '/userstatus',
                method: 'PUT',
                headers: {
                    'Authorization': this.$store.state._token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    Status: type,
                    UserID: row.UserID
                })
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.getPageData()
                }
            })
        }
    }
}
</script>
<style lang="css" scoped>
    #pagination {
        padding: 40px 20px 0 20px;
    }
    .margin-right {
        width: 15%;
        margin-right: 20px;
    }
</style>
