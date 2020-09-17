<template>
<div class="">
    <!-- <label class="margin-large">
        <span>新闻标题:</span>
        <el-input class="margin" v-model="newsTitle" placeholder="请输入内容"></el-input>
    </label> -->
    <label class="margin-large">
        <span>新闻内容:</span>
        <el-input class="margin" type="textarea" :rows="4" placeholder="请输入内容" v-model="newsContent"></el-input>
    </label>
    <el-button type="primary" @click="uploadChange">上传</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="新闻ID" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ID }}</span>
            </template>
        </el-table-column>
        <el-table-column label="新闻内容" width="300">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Content }}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" width="220">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ fmtTime(scope.row.CreateAt) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="发布状态" width="120">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Status === 2 ? '已发布' : '已下架' }}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button v-if="scope.row.Status === 2" size="mini" type="warning" @click="unpublishNews(scope.row)">下架</el-button>
                <el-button v-else size="mini" type="success" @click="publishNews(scope.row)">发布</el-button>
                <el-button size="mini" type="danger" @click="deleteNews(scope.row)">删除</el-button>
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
import { formatTime } from '@/utils/common.js'
export default {
    data() {
        return {
            newsContent: '',
            tableData: [],
            curPage: 1,
            totalRows: 20
        }
    },
    mounted() {
        this.getNewsList()
    },
    methods: {
        fmtTime(e) {
            return formatTime(e)
        },
        handleCurrentChange() {
            this.getNewsList()
        },
        getNewsList() {
            this.$axios({
                url: '/news',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    Offset: (this.curPage - 1) * 10,
                    Limit: 10
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.tableData = res.data.Data.Rows
                    this.totalRows = res.data.Data.Page.TotalRows
                }
            })
        },
        uploadChange() {
            this.$axios({
                url: '/news',
                method: 'POST',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Content: this.newsContent
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.newsContent = ''
                    this.getNewsList()
                }
            })
        },
        publishNews(row) {
            console.log(row);
            this.$axios({
                url: '/news',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Status: 2,
                    ID: row.ID
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.getNewsList()
                }
            })
        },
        unpublishNews(row) {
            console.log(row);
            this.$axios({
                url: '/news',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Status: 1,
                    ID: row.ID
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.getNewsList()
                }
            })
        },
        deleteNews(row) {
            this.$axios({
                url: '/news',
                method: 'DELETE',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    ID: row.ID
                }
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.getNewsList()
                }
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
    #pagination {
        padding: 40px 20px 0 20px;
    }
</style>
