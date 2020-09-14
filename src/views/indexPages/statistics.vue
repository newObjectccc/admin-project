<template>
<div class="">
    <div class="block">
        <el-date-picker v-model="timeValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange">
        </el-date-picker>
    </div>
    <div id="usdtChart" :style="{width: '100%', height: '400px'}"></div>
    <div id="ectChart" :style="{width: '100%', height: '400px'}"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            timeValue: '',
            usdtChart: null,
            ectChart: null,
            usdtOption: {
                title: {
                    text: 'USDT Statistics'
                },
                tooltip: {
                    show: true
                },
                dataset: {
                    source: [
                        ['total', 'product'],
                        [0, 'USDT总金额'],
                        [0, '充值总金额'],
                        [0, '消耗总金额'],
                        [0, '转账总金额']
                    ]
                },
                grid: {
                    containLabel: true
                },
                xAxis: {
                    name: 'total'
                },
                yAxis: {
                    type: 'category'
                },
                series: [{
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'total',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }]
            },
            ectOption: {
                title: {
                    text: 'ECT Statistics'
                },
                tooltip: {
                    show: true
                },
                dataset: {
                    source: [
                        ['total', 'product'],
                        [0, 'ECT总金额'],
                        [0, '转账总金额'],
                        [0, '到账总金额']
                    ]
                },
                grid: {
                    containLabel: true
                },
                xAxis: {
                    name: 'total'
                },
                yAxis: {
                    type: 'category'
                },
                series: [{
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'total',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }]
            }
        }
    },
    created() {
        this.getECTData()
        this.getUSDTData()
    },
    mounted() {
        this.drawEchart()
    },
    methods: {
        async timeChange(e) {
            let beginTime = e[0].getTime() / 1000
            let overTime = e[1].getTime() / 1000
            this.getECTData(beginTime, overTime)
            this.getUSDTData(beginTime, overTime)
        },
        drawEchart() {
            this.usdtChart = this.$echarts.init(document.getElementById('usdtChart'));
            this.usdtChart.setOption(this.usdtOption, window.onresize = this.usdtChart.resize);
            this.ectChart = this.$echarts.init(document.getElementById('ectChart'))
            this.ectChart.setOption(this.ectOption, window.onresize = this.ectChart.resize)
        },
        getECTData(b, o) {
            this.$axios({
                url: '/ectrangestatistics',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    BeginTime: b,
                    EndTime: o
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200 && res.data.Data !== null) {
                    res.data.Data.map((item, index) => {
                        this.$set(this.ectOption.dataset.source[index + 1], '0', item)
                        if (index === res.data.Data.length - 1) {
                            if (this.usdtOption.dataset.source[1][0] !== 0) {
                                // 判断usdtOption数据是否加载完成, 完成则开始画图
                                this.drawEchart()
                            }
                        }
                    })
                }
            })
        },
        getUSDTData(b, o) {
            this.$axios({
                url: '/usdtrangestatistics',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                params: {
                    BeginTime: b,
                    EndTime: o
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200 && res.data.Data !== null) {
                    res.data.Data.map((item, index) => {
                        this.$set(this.usdtOption.dataset.source[index + 1], '0', item)
                        if (index === res.data.Data.length - 1) {
                            if (this.ectOption.dataset.source[1][0] !== 0) {
                                // 判断ectOption数据是否加载完成, 完成则开始画图
                                this.drawEchart()
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .block {
        margin: 20px 0;
    }
</style>
