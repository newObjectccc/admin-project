<template>
<div class="">
    <div class="wrap">
        <div class="spans">当前{{curExchange.Mark}}：{{curExchange.Value}}</div>
        <el-input class="margin-right" v-model="baseExchangeValue" :placeholder="'设置' + curExchange.Mark"></el-input>
        <el-button size="small" type="primary" @click="setExchange">设置</el-button>
    </div>
    <div class="wrap">
        <div class="spans">当前{{curUSDT.Mark}}：{{curUSDT.Value}}</div>
        <el-input class="margin-right" v-model="baseUSDTValue" :placeholder="'设置' + curUSDT.Mark"></el-input>
        <el-button size="small" type="primary" @click="setUSDT">设置</el-button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            baseExchangeValue: '',
            baseUSDTValue: '',
            curExchange: '',
            curUSDT: ''
        }
    },
    mounted() {
        this.getConfig()
    },
    methods: {
        getConfig() {
            this.$axios({
                url: '/config',
				method: 'GET',
				headers: {
					Authorization: this.$store.state._token
				}
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.curExchange = res.data.Data[0];
                    this.curUSDT = res.data.Data[1];
                }
            })
        },
        setExchange() {
            this.$axios({
                url: '/config',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Value: parseFloat(this.baseExchangeValue),
                    Mark: this.curExchange.Mark,
                    ID: this.curExchange.ID
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.baseExchangeValue = '';
                    this.getConfig()
                }
            }).catch(err => {
                this.$message.error(err)
            })
        },
        setUSDT() {
            this.$axios({
                url: '/config',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Value: parseFloat(this.baseUSDTValue),
                    Mark: this.curUSDT.Mark,
                    ID: this.curUSDT.ID
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.baseUSDTValue = '';
                    this.getConfig()
                }
            }).catch(err => {
                this.$message.error(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .wrap {
        width: 70%;
        display: flex;
        align-items: center;
        margin: 20px 0;

    }
    .spans {
        display: block;
        width: 50%;
        border: 1px solid #8a8a8a;
        padding: 10px;
        border-radius: 6px;
        margin-right: 10px;
    }
    .margin-right {
        margin-right: 20px;
    }
</style>
