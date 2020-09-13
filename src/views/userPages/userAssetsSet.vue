<template>
<div class="">
    <div class="wrap">
        <el-input class="margin-right" v-model="userID" placeholder="请输入用户ID"></el-input>
        <el-button size="small" type="primary" @click="searchAssets">查询用户</el-button>
    </div>

    <template v-if="usdtTableData !== []">
        <div class="table-title">
            USDT资产
        </div>
        <el-table :data="usdtTableData" style="width: 100%">
            <el-table-column label="用户ID" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.UserID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="资产" width="240">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Money }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手续费" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Free }}</span>
                </template>
            </el-table-column>
            <el-table-column label="放大系数" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Factor }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Status === 1 ? '正常' : '已冻结' }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.Status === 1" size="mini" type="danger" @click="handleAssets(scope.row, 1)">冻结资产</el-button>
                    <el-button v-else size="mini" type="success" @click="handleAssets(scope.row, 1)">解冻资产</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 2)">修改放大系数</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 3)">修改手续费</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 4)">修改资产</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>

    <template v-if="ectTableData !== []">
        <div class="table-title">
            ECT资产
        </div>
        <el-table :data="ectTableData" style="width: 100%">
            <el-table-column label="用户ID" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.UserID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="资产" width="240">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Money }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手续费" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Free }}</span>
                </template>
            </el-table-column>
            <el-table-column label="放大系数" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Factor }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.Status === 1 ? '正常' : '已冻结' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.Status === 1" size="mini" type="danger" @click="handleAssets(scope.row, 1)">冻结资产</el-button>
                    <el-button v-else size="mini" type="success" @click="handleAssets(scope.row, 1)">解冻资产</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 2)">修改放大系数</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 3)">修改手续费</el-button>
                    <el-button size="mini" type="warning" @click="toggleDialog(scope.row, 4)">修改资产</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="修改数值" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input class="margin" type="number" v-model="fixValue" placeholder="请输入"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAssets(curData, curType)">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            userID: '',
            usdtTableData: [],
            ectTableData: [],
            centerDialogVisible: false,
            curType: 0,
            curData: {},
            fixValue: 0
        }
    },
    methods: {
        searchAssets() {
            this.$axios({
                url: '/userassets',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    UserID: this.userID
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    res.data.Data.map(item => {
                        if (item.Name === 'ECT') {
                            this.ectTableData = [item]
                        } else {
                            // item.Name === 'USDT'
                            this.usdtTableData = [item]
                        }
                    })
                } else {
                    this.$message.error('操作失败！')
                }
            })
        },
        toggleDialog(row, t) {
            this.curType = t;
            this.curData = row;
            this.centerDialogVisible = true;
        },
        handleAssets(row, t) {
            console.log(t);
            let cur_params = {
                ID: row.ID
            }, curUrl = '';
            if (t === 1) {
                cur_params.Status = row.Status === 1 ? 2 : 1;
                curUrl = '/userassetsstatus';
            }
            if (t === 2) {
                cur_params.Factor = parseFloat(this.fixValue);
                curUrl = '/userassetsfactor';
                this.centerDialogVisible = false;
            }
            if (t === 3) {
                cur_params.Free = parseFloat(this.fixValue);
                curUrl = '/userassetsfree';
                this.centerDialogVisible = false;
            }
            if (t === 4) {
                this.changeAssets();
                this.centerDialogVisible = false;
            }
            this.$axios({
                url: curUrl,
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: cur_params
            }).then(res => {
                console.log(res);
                this.fixValue = 0;  //回复默认值
                if (res.status === 200) {
                    this.searchAssets()
                }
            })
        },
        changeAssets() {
            this.$axios({
                url: '/userassetsmoney',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    UserID: this.curData.UserID,
                    Name: this.curData.Name,
                    Money: parseFloat(this.fixValue)
                }
            }).then(res => {
                console.log(res);
                this.centerDialogVisible = false;
                if (res.status === 200) {
                    this.searchAssets()
                }
            }).catch(err => {
                console.log(err);
                this.$message.error('更新失败！')
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
    .table-title {
        font-size: 18px;
        font-weight: 600;
        margin: 20px 0;
    }
</style>
