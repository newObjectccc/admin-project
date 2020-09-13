<template>
<div class="">
    <div class="block">
        <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"

        >
        </el-date-picker>
    </div>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            timeValue: '',
            myChart: null,
            option: {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '2012', '2013', '2014', '2015'],
                        ['USDT', 41.1, 30.4, 65.1, 53.3],
                        ['ECT', 86.5, 92.1, 85.7, 83.1]
                    ]
                },
                xAxis: [{
                        type: 'category',
                        gridIndex: 0
                    },
                    {
                        type: 'category',
                        gridIndex: 1
                    }
                ],
                yAxis: [{
                        gridIndex: 0
                    },
                    {
                        gridIndex: 1
                    }
                ],
                grid: [{
                        bottom: '55%'
                    },
                    {
                        top: '55%'
                    }
                ],
                series: [
                    // These series are in the first grid.
                    {
                        type: 'bar',
                        seriesLayoutBy: 'row'
                    },
                    {
                        type: 'bar',
                        seriesLayoutBy: 'row'
                    },
                    {
                        type: 'bar',
                        seriesLayoutBy: 'row'
                    },
                    // These series are in the second grid.
                    {
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    },
                    {
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    },
                    {
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    },
                    {
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }
                ]
            },

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
        timeChange(e) {
            let beginTime = e[0].getDay().getTime()
            let overTime = e[1].getDay().getTime()
            console.log(e[0].getDay().getTime());
            console.log(e[1].getDay().getTime());
            this.getECTData(beginTime, overTime)
            this.getUSDTData(beginTime, overTime)
        },
        drawEchart() {
            this.myChart = this.$echarts.init(document.getElementById('myChart'))
            this.myChart.setOption(this.option, window.onresize = this.myChart.resize)
        },
        getECTData(b, o) {
            this.$axios({
                url: '/ectrangestatistics',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    BeginTime: b,
                    EndTime: o
                }
            }).then(res => {
                console.log(res);
            })
        },
        getUSDTData(b, o) {
            this.$axios({
                url: '/usdtrangestatistics',
                method: 'GET',
                headers: {
                    Authorization: this.$store.state._token
                },
                data: {
                    BeginTime: b,
                    EndTime: o
                }
            }).then(res => {
                console.log(res);
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
