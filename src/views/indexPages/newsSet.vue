<template>
<div class="">
    <label class="margin-large">
        <span>新闻标题:</span>
        <el-input class="margin" v-model="newsTitle" placeholder="请输入内容"></el-input>
    </label>
    <label class="margin-large">
        <span>新闻内容:</span>
        <el-input class="margin" type="textarea" :rows="10" placeholder="请输入内容" v-model="newsContent"></el-input>
    </label>
    <el-button type="primary" @click="uploadChange">修改上传</el-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            newsTitle: '',
            newsContent: ''
        }
    },
    methods: {
        uploadChange() {
            this.$axios({
                url: '/news',
				method: 'POST',
				headers: {
					Authorization: this.$store.state._token
				},
                params: {

                }
            }).then((res) => {
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
</style>
