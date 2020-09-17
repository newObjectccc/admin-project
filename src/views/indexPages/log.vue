<template>
<div class="">
    <div class="btn-wrap">
        <el-input class="margin-right" v-model="userValue" placeholder="输入userID进行筛选(用户ID)"></el-input>
        <el-input class="margin-right" v-model="typeValue" placeholder="输入type进行筛选(类型)"></el-input>
        <el-input class="margin-right" v-model="fromCoinValue" placeholder="输入FromCoin进行筛选(转入币种)"></el-input>
        <el-input class="margin-right" v-model="toCoinValue" placeholder="输入ToCoin进行筛选(到账币种)"></el-input>
        <el-input class="margin-right" v-model="fromAddressValue" placeholder="输入FromAddress进行筛选(转入地址)"></el-input>
        <el-input class="margin-right" v-model="toAddressValue" placeholder="输入ToAddress进行筛选(到账地址)"></el-input>
    </div>
    <el-button size="small" type="primary" @click="getPageData">筛选查询</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户ID" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.UserID }}</span>
            </template>
        </el-table-column>
        <el-table-column label="转入币种" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FromCoin }}</span>
            </template>
        </el-table-column>
        <el-table-column label="转入金额" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FromAmount }}</span>
            </template>
        </el-table-column>
        <el-table-column label="转入地址" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FromAddress }}</span>
            </template>
        </el-table-column>
        <el-table-column label="到账币种" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ToCoin }}</span>
            </template>
        </el-table-column>
        <el-table-column label="到账金额" width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ToAmount }}</span>
            </template>
        </el-table-column>
        <el-table-column label="到账地址" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ToAddress }}</span>
            </template>
        </el-table-column>
        <el-table-column label="手续费" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Free }}</span>
            </template>
        </el-table-column>
        <el-table-column label="手续费扣费币种" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FreeCoin }}</span>
            </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Type === 1 ? '充值' : scope.row.Type === 2 ? '兑换' : scope.row.Type === 3 ? '转账' : scope.row.Type === 4 ? '归集' : '人工调账' }}</span>
            </template>
        </el-table-column>
    </el-table>
    <div id="pagination" class="block">
        <el-pagination
            :current-page.sync="curPage"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="totalRows"
        >
        </el-pagination>
    </div>

</div>
</template>

<script>
export default {
    name: 'log',
    data() {
        return {
            userValue: '',
            typeValue: '',
            fromCoinValue: '',
            toCoinValue: '',
            fromAddressValue: '',
            toAddressValue: '',
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
                url: '/assetlogs',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Offset: (this.curPage - 1) * 10,
                    Limit: 10,
                    Type: this.typeValue,
                    FromCoin: this.fromCoinValue,
                    ToCoin: this.toCoinValue,
                    FromAddress: this.fromAddressValue,
                    ToAddress: this.toAddressValue,
                    UserID: this.userValue
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
        }
    }
}
</script>
<style lang="css" scoped>
    #pagination {
        padding: 40px 20px 0 20px;
    }
    .btn-wrap {
        display: flex;
        flex-flow: column nowrap;

    }
    .margin-right {
        margin: 5px 0;
        width: 30%;
    }
</style>
