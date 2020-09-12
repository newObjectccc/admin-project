<template>
<div class="">
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
        <el-table-column label="Email" width="200">
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
                <el-button size="mini" type="danger" @click="frozenAccount(scope.row)">冻结用户</el-button>
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
                    Limit: 20
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
        frozenAccount(row) {
            console.log(row);
            let curStatus = row.Status === 1 ? 2 : 1
            this.$axios({
                url: '/userstatus',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Status: curStatus,
                    UserID: row.ID
                }
            }).then(res => {
                console.log(res);
            })
        }
    }
}
</script>
<style lang="css" scoped>
    #pagination {
        padding: 40px 20px 0 20px;
    }
    #dialog .margin {
        margin-top: 5px;
    }
    #dialog .margin-large {
        margin: 20px 0;
    }
</style>
