<template>
    <div id="home" class="clear">
        <div class="left fl">
            <div class="chart card" ref="chart"></div>
            <div class="transferMsg card">
                <h1 class="card gradient_orange">我的转让信息</h1>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/home/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/home/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/home/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/home/email.png" alt=""><span>245</span></li>
                </ul>
            </div>
            <div class="tradeMsg card">
                <header>最近交易</header>
                <section>
                    <ol class="clear">
                        <li class="fl">时间</li>
                        <li class="fl">金额(CNY)</li>
                        <li class="fl"></li>
                        <li class="fl">数量</li>
                    </ol>
                    <ul class="clear" v-for="i in tradeMsgData">
                        <li class="fl">{{i.time}}</li>
                        <li class="fl">{{i.money}}</li>
                        <li class="fl"><span class="green">=></span></li>
                        <li class="fl">{{i.count}}</li>
                    </ul>
                </section>
            </div>
        </div>
        <div class="center fl">
            <header class="clear">
                <span class="fl current">基金</span>
                <span class="fl">股权</span>
                <button class="gradient_blue fr" type="button">发布</button>
            </header>
            <el-table
                class="tableList"
                :data="tableData"
                row-class-name="card"
                header-cell-class-name="tableTitle"
                style="width: 100%">
                <el-table-column label="所属LP/GP名称">
                    <template slot-scope="scope">
                        <img src="../../../assets/img/platform/home/equity_icon.png" alt="">
                        <span>{{scope.row.company}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="股权名称"></el-table-column>
                <el-table-column label="总份额">
                    <template slot-scope="scope"><em>{{scope.row.total}}</em></template>
                </el-table-column>
                <el-table-column label="标价">
                    <template slot-scope="scope"><em>{{scope.row.price}}</em></template>
                </el-table-column>
                <el-table-column label="预估年收益">
                    <template slot-scope="scope"><strong>{{scope.row.percent}}</strong></template>
                </el-table-column>
                <el-table-column width="80" label="操作">
                    <template slot-scope="scope"><el-button type="danger" size="mini">交易</el-button></template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
        <div class="right fl">
            <ul>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/home/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/home/AI_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/home/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/home/data_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/home/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/home/retail_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/home/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/home/blockChain_icon.png" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return{
                tradeMsgData: [
                    {
                        time: '2018-05-06',
                        money: '120万',
                        count: '25000份'
                    },
                    {
                        time: '2018-07-09',
                        money: '1220万',
                        count: '15000份'
                    },
                    {
                        time: '2018-01-16',
                        money: '420万',
                        count: '45000份'
                    },
                    {
                        time: '2018-05-06',
                        money: '620万',
                        count: '16.5%'
                    },
                    {
                        time: '2018-07-25',
                        money: '1120万',
                        count: '41000份'
                    },
                    {
                        time: '2018-02-11',
                        money: '3610万',
                        count: '17.5%'
                    },
                    {
                        time: '2018-03-01',
                        money: '120万',
                        count: '25000份'
                    },
                    {
                        time: '2018-02-07',
                        money: '420万',
                        count: '5.8%'
                    },
                    {
                        time: '2018-06-06',
                        money: '920万',
                        count: '32000份'
                    },
                    {
                        time: '2018-05-06',
                        money: '870万',
                        count: '55000份'
                    }
                ],
                tableData: [
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    },
                    {
                        company: '中国风险投资',
                        name: '金斧子全明星基金',
                        total: '100W企元',
                        price: '120W投元',
                        percent: '4.563%'
                    }
                ]
            }
        },
        methods: {
            chartFun() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.chart);
                // 图表配置项
                let option = {
                    title: {
                        text: '股权曲线图',
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        },
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['成交总金额', '成交总数量'],
                        right: 10,
                        top: 10
                    },
                    grid: {
                        left: 10,
                        right: 20,
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#0acffe','#475dff'],
                    series: [
                        {
                            name: '成交总金额',
                            type: 'line',
                            data: [11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'}
                                ]
                            }
                        },
                        {
                            name: '成交总数量',
                            type: 'bar',
                            barWidth: 30,
                            data: [1, 4, 2, 8, 3, 2, 7],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'}
                                ]
                            }
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            }
        },
        mounted() {
            this.chartFun();
        }
    }
</script>

<style lang="scss" scoped>
    #home{
        padding: 20px 0;
        .left{
            width: 520px;
            .chart{
                height: 265px;
            }
            .transferMsg{
                height: 240px;
                margin: 20px 0;
                padding: 10px 15px;
                h1{
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    text-align: center;
                    margin-bottom: 10px;
                }
                ul{
                    height: 40px;
                    line-height: 40px;
                    padding: 0 10px;
                    li{
                        &:nth-child(1){
                            width: 45%;
                        }
                        &:nth-child(2){
                            width: 20%;
                        }
                        &:nth-child(3){
                            width: 20%;
                        }
                        &:nth-child(4){
                            width: 15%;
                            img{
                                margin-top: 13px;
                                margin-right: 10px;
                            }
                        }
                    }
                    &:not(:last-child){
                        margin-bottom: 10px;
                    }
                }
            }
            .tradeMsg{
                height:385px;
                padding: 0 20px 20px;
                header{
                    height: 54px;
                    line-height: 54px;
                }
                section{
                    li{
                        line-height: 30px;
                        height: 30px;
                        &:nth-child(1) {
                            width: 20%;
                            text-align: center;
                        }
                        &:nth-child(2) {
                            width: 30%;
                            text-align: right;
                        }
                        &:nth-child(3) {
                            width: 20%;
                            text-align: center;
                            span.green{
                                color: #43CB83;
                            }
                            span.yellow{
                                color: #F5A623;
                            }
                        }
                        &:nth-child(4) {
                            width: 30%;
                            text-align: center;
                        }
                    }
                    ol{
                        border-bottom: 1px solid #E7E7E7;
                        color: #CDCDCD;
                    }
                }
            }
        }
        .center{
            width: 1000px;
            margin: 0 20px;
            header{
                height: 36px;
                margin-bottom: 10px;
                span{
                    height: 34px;
                    line-height: 34px;
                    border-bottom: 2px solid transparent;
                    width: 90px;
                    text-align: center;
                    cursor: pointer;
                    &.current{
                        color: #000;
                        border-bottom: 2px solid #000;
                    }
                }
                button{
                    width: 120px;
                    height: 36px;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 4px;
                }
            }
            .tableList{
                img{
                    vertical-align: middle;
                    margin-right: 10px;
                }
                em{
                    color: #fe6f67;
                    font-style: normal;
                }
                strong{
                    color: #475fff;
                    font-weight: normal;
                }
            }
        }
        .right{
            width: 320px;
            ul{
                li{
                    position: relative;
                    padding: 18px 24px;
                    &:not(:last-child){
                        margin-bottom: 22px;
                    }
                    &:nth-child(odd){
                        button{
                            background: linear-gradient(to right, #feb872, #fe6e67);
                        }
                    }
                    &:nth-child(even){
                        button{
                            background: linear-gradient(to right, #0acffe, #485cff);
                        }
                    }
                    h1{
                        height: 40px;
                        line-height: 40px;
                        font-size: 24px;
                    }
                    h2{
                        height: 50px;
                        line-height: 50px;
                        color: #fe6f67;
                        span{
                            font-size: 24px;
                        }
                    }
                    h3{
                        height: 50px;
                        line-height: 50px;
                        strong{
                            font-weight: normal;
                            color: #475fff;
                            margin: 0 4px;
                        }
                    }
                    h4{
                        height: 50px;
                        line-height: 50px;
                        button{
                            width: 120px;
                            height: 30px;
                            border-radius: 15px;
                            color: #fff;
                        }
                    }
                    img{
                        position: absolute;
                        &.tag{
                            top: 0;
                            right: 20px;
                        }
                        &.triangle{
                            bottom: 0;
                            right: 0;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    #home{
        .tableTitle{
            background-color: #fafafa;
        }
        .el-table{
            background-color: transparent;
            .el-table__body{
                border-spacing: 0 10px;
            }
            th.is-leaf, td{
                border-bottom: none;
            }
            th.is-leaf{
                padding-bottom: 2px;
            }
            td{
                &:first-child{
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                &:last-child{
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
            }
            &::before{
                height: 0;
            }
        }
        .pagination{
            text-align: right;
            margin-top: 13px;
            &.is-background .btn-prev,
            &.is-background .btn-next,
            &.is-background .el-pager li{
                background-color: #fff;
            }
            &.is-background .el-pager li:not(.disabled).active{
                background-color: #409EFF;
            }
        }
    }
</style>
