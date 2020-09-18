<template>
<div class="">
    <div class="wrap">
        <el-input class="margin-right" v-model="userPhone" placeholder="请输入用户手机号码"></el-input>
        <el-button size="small" type="primary" @click="getPageData">查询用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户" width="80">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.UserID }}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户手机号" width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Phone }}</span>
            </template>
        </el-table-column>
        <el-table-column label="币种" width="80">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Name }}</span>
            </template>
        </el-table-column>
        <el-table-column sortable :sort-orders="['ascending', 'descending']" label="余额" width="80">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Money }}</span>
            </template>
        </el-table-column>
        <el-table-column label="地址" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Address }}</span>
            </template>
        </el-table-column>
        <el-table-column label="ETH手续费余额" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Free }}</span>
            </template>
        </el-table-column>
        <el-table-column label="ETH归集状态" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FreeStatus }}</span>
            </template>
        </el-table-column>
        <el-table-column label="ETH手续费交易Hash" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FreeTx }}</span>
            </template>
        </el-table-column>
        <el-table-column label="USDT归集状态" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.MergeStatus }}</span>
            </template>
        </el-table-column>
        <el-table-column label="USDT归集交易Hash" width="140">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.MergeTx }}</span>
            </template>
        </el-table-column>
        <el-table-column label="私钥" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.PrivateKey }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="showDialog(scope.row)">ETH归集设置</el-button>
                <!-- <el-button v-else size="mini" type="success" @click="frozenAccount(scope.row)">解结用户</el-button> -->
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
    <el-dialog title="归集设置" :visible.sync="centerDialogVisible" width="30%" center>
        <span class="margin">归集金额:</span>
        <el-input type="number" v-model="amountValue" :placeholder="curRow.Free"></el-input>
        <span class="margin">GasLimit（eth）:</span>
        <el-input type="number" v-model="gasLimitValue" placeholder="请输入"></el-input>
        <span class="margin">GasPrice（eth）:</span>
        <el-input type="number" v-model="gasPriceValue" placeholder="请输入"></el-input>
        <!-- <span class="margin">私钥:</span>
        <el-input :disabled="false" type="text" v-model="privateKeyValue" placeholder="请输入"></el-input> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSet">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'notionalPooling',
    data() {
        return {
            userPhone: '',
            tableData: [],
            curPage: 1,
            totalRows: 20,
            centerDialogVisible: false,
            amountValue: '',
            gasLimitValue: '',
            gasPriceValue: '',
            privateKeyValue: '',
            curRow: {}
        }
    },
    created() {
        this.getPageData()
    },
    methods: {
        handleSet() {
            this.$axios({
                url: '/ethsend',
                method: 'POST',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Amount: parseFloat(this.amountValue),
                    GasLimit: parseInt(this.gasLimitValue),
                    GasPrice: parseFloat(this.gasPriceValue),
                    PrivateKey: this.privateKeyValue,
                    UserID: this.curRow.UserID,
                    FromAddress: this.curRow.FromAddress
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$message.success('归集成功')
                    this.getPageData()
                } else {
                    this.$message.error('归集失败')
                }
            })
        },
        getPageData() {
            this.$axios({
                url: '/userusdtfreemerge',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Phone: this.userPhone,
                    Offset: (this.curPage - 1) * 10,
                    Limit: 10,
                    OrderBy: 'free',
                    Sort: 'desc'
                }
            }).then((res) => {
                this.tableData = res.data.Data.Rows
                this.totalRows = res.data.Data.Page.TotalRows
            })
        },
        handleCurrentChange() {
            this.getPageData();
        },
        showDialog(row) {
            this.curRow = JSON.parse(JSON.stringify(row));
            this.toValue = this.curRow.Address;
            this.privateKeyValue = this.curRow.PrivateKey;
            this.centerDialogVisible = true;
        }
    }
}
</script>
<style lang="css" scoped>
    #pagination {
        padding: 40px 20px 0 20px;
    }
    .margin {
        display: block;
        margin: 10px 0;
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
