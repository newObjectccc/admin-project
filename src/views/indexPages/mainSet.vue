<template>
<div class="">
    <div class="wrap">
        <div class="spans">当前兑换值：{{curExchange}}</div>
        <el-input class="margin-right" v-model="baseExchangeValue" placeholder="设置兑换值"></el-input>
        <el-button size="small" type="primary" @click="setExchange">设置</el-button>
    </div>
    <div class="wrap">
        <div class="spans">当前usdt归集起始金额：{{curUSDT}}</div>
        <el-input class="margin-right" v-model="baseUSDTValue" placeholder="设置usdt归集起始金额"></el-input>
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
                    this.curExchange = res.data.Data.ect_usdt;
                    this.curUSDT = res.data.Data.usdt_merge_amount;
                }
            })
        },
        setExchange() {
            this.$axios({
                url: '/userassetsmomeny',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Factor: parseFloat(this.baseFactorValue)
                }
            }).then(res => {
                console.log(res);
            })
        },
        setUSDT() {
            this.$axios({
                url: '/userassetsstatus',
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    Free: parseFloat(this.baseFreeValue)
                }
            }).then(res => {
                console.log(res);
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
