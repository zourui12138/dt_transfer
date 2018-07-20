<template>
    <div id="home" class="clear">
        <div class="left fl">
            <div class="chart card" ref="chart"></div>
            <div style="display: none" class="transferMsg card">
                <h1 class="card gradient_orange">我的转让信息</h1>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/email.png" alt=""><span>245</span></li>
                </ul>
                <ul class="card clear">
                    <li class="fl">基金名称是什么基金</li>
                    <li class="fl">基金</li>
                    <li class="fl">200W</li>
                    <li class="fl"><img src="../../../assets/img/platform/email.png" alt=""><span>245</span></li>
                </ul>
            </div>
            <div class="tradeMsg card">
                <header>最近交易</header>
                <section>
                    <ol class="clear">
                        <li class="fl">时间</li>
                        <li class="fl">类型</li>
                        <li class="fl">成交额(投元)</li>
                    </ol>
                    <ul class="clear" v-for="i in tradeMsgData">
                        <li class="fl">{{i.time}}</li>
                        <li class="fl">{{i.type}}</li>
                        <li class="fl">{{i.money}}</li>
                    </ul>
                </section>
            </div>
        </div>
        <div class="center fl">
            <header class="clear">
                <span @click="toggleTabs('funds')" :class="showTabs === 'funds' ? 'current' : ''" class="fl">基金</span>
                <span @click="toggleTabs('equity')" :class="showTabs === 'equity' ? 'current' : ''" class="fl">股权</span>
                <button class="fr" type="button">发布</button>
            </header>
            <div class="recommend card">
                <h1><img src="../../../assets/img/platform/recommend.png" alt=""><span>热门推荐</span></h1>
                <ul class="clear">
                    <li class="fl">
                        <h2>易方达项目转让</h2>
                        <h3>穿越牛熊，5年正收益</h3>
                        <h4>近一年涨幅</h4>
                        <h5 class="add"><span>27.59</span>%</h5>
                    </li>
                    <li class="fl">
                        <h2>易方达中小盘</h2>
                        <h3>穿越牛熊，5年正收益</h3>
                        <h4>近一年涨幅</h4>
                        <h5 class="subtract"><span>-3.48</span>%</h5>
                    </li>
                    <li class="fl">
                        <h2>易方达项目转让</h2>
                        <h3>穿越牛熊，5年正收益</h3>
                        <h4>近一年涨幅</h4>
                        <h5 class="add"><span>27.59</span>%</h5>
                    </li>
                </ul>
            </div>
            <div v-show="showTabs === 'funds'" class="funds">
                <div class="tableHeader clear card">
                    <img class="fl" src="../../../assets/img/platform/table_icon.png" alt="">
                    <span class="fl">全部基金</span>
                    <button class="fr" type="button">搜索</button>
                    <el-input class="fr" placeholder="请输入内容" size="medium" v-model="search" clearable></el-input>
                </div>
                <el-table
                    class="tableList"
                    :data="fundsList"
                    row-class-name="card"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column label="所属人">
                        <template slot-scope="scope">
                            <img src="../../../assets/img/platform/equity_icon.png" alt="">
                            <span>{{scope.row.owner}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="基金简称"></el-table-column>
                    <el-table-column label="转让份额">
                        <template slot-scope="scope"><em>{{scope.row.amount+'企元'}}</em></template>
                    </el-table-column>
                    <el-table-column label="转让价格">
                        <template slot-scope="scope"><em>{{scope.row.price+'投元'}}</em></template>
                    </el-table-column>
                    <el-table-column label="近一年收益率">
                        <template slot-scope="scope"><strong>{{scope.row.profit+'%'}}</strong></template>
                    </el-table-column>
                    <el-table-column width="80" label="操作">
                        <template slot-scope="scope"><el-button @click="toDetail(0,scope.row.productId)" type="danger" size="mini">交易</el-button></template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" background layout="prev, pager, next" :total="fundsTotal" :page-size="pageSize" @current-change="getHomeFund"></el-pagination>
            </div>
            <div v-show="showTabs === 'equity'" class="equity">
                <div class="tableHeader clear card">
                    <img class="fl" src="../../../assets/img/platform/table_icon.png" alt="">
                    <span class="fl">全部股权</span>
                    <button class="fr" type="button">搜索</button>
                    <el-input class="fr" placeholder="请输入内容" size="medium" v-model="search" clearable></el-input>
                </div>
                <el-table
                    class="tableList"
                    :data="equityList"
                    row-class-name="card"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column label="所属人">
                        <template slot-scope="scope">
                            <img src="../../../assets/img/platform/equity_icon.png" alt="">
                            <span>{{scope.row.owner}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="股权简称"></el-table-column>
                    <el-table-column label="转让份额">
                        <template slot-scope="scope"><em>{{scope.row.amount+'企元'}}</em></template>
                    </el-table-column>
                    <el-table-column label="转让价格">
                        <template slot-scope="scope"><em>{{scope.row.price+'投元'}}</em></template>
                    </el-table-column>
                    <el-table-column label="近一年收益率">
                        <template slot-scope="scope"><strong>{{scope.row.profit+'%'}}</strong></template>
                    </el-table-column>
                    <el-table-column width="80" label="操作">
                        <template slot-scope="scope"><el-button type="danger" size="mini" @click="toDetail(1,scope.row.productId)">交易</el-button></template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" background layout="prev, pager, next" :total="equityTotal" :page-size="pageSize" @current-change="getHomeEquity"></el-pagination>
            </div>
        </div>
        <div class="right fl">
            <ul>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/AI_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/data_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/retail_icon.png" alt="">
                </li>
                <li class="card">
                    <h1>硅谷人工智能项目</h1>
                    <h2><span>100</span>万</h2>
                    <h3>可售份额<strong>2000</strong>份</h3>
                    <h4><button type="button">了解更多</button></h4>
                    <img class="tag" src="../../../assets/img/platform/tag.png" alt="">
                    <img class="triangle" src="../../../assets/img/platform/blockChain_icon.png" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getHomeFund,getHomeEquity} from '../../../api/getData'

    export default {
        name: "Home",
        data() {
            return{
                tradeMsgData: [
                    {
                        time: '2018-02-11 12:20:20',
                        money: '3610万',
                        type: '股权'
                    },
                    {
                        time: '2018-07-25 12:20:20',
                        money: '1120万',
                        type: '基金'
                    },
                    {
                        time: '2018-02-11 12:20:20',
                        money: '3610万',
                        type: '股权'
                    },
                    {
                        time: '2018-03-01 12:20:20',
                        money: '120万',
                        type: '基金'
                    },
                    {
                        time: '2018-05-06 12:20:20',
                        money: '120万',
                        type: '基金'
                    },
                    {
                        time: '2018-07-09 12:20:20',
                        money: '1220万',
                        type: '股权'
                    },
                    {
                        time: '2018-01-16 12:20:20',
                        money: '420万',
                        type: '基金'
                    },
                    {
                        time: '2018-02-11 12:20:20',
                        money: '3610万',
                        type: '股权'
                    },
                    {
                        time: '2018-07-25 12:20:20',
                        money: '1120万',
                        type: '基金'
                    },
                    {
                        time: '2018-02-11 12:20:20',
                        money: '3610万',
                        type: '股权'
                    },
                    {
                        time: '2018-03-01 12:20:20',
                        money: '120万',
                        type: '基金'
                    },
                    {
                        time: '2018-05-06 12:20:20',
                        money: '620万',
                        type: '股权'
                    }
                ],
                search: '',
                showTabs: 'funds',
                fundsList: [],
                fundsTotal: null,
                equityList: [],
                equityTotal: null,
                pageSize: 8
            }
        },
        methods: {
            chartFun() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.chart);
                // 图表配置项
                let option = {
                    title: {
                        text: '转让曲线图',
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
                        data:['股权转让总量', '基金转让总量'],
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
                        data: ['07.15','07.16','07.17','07.18','07.19','07.20','07.21']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#5f6ac0','#fe5a04'],
                    series: [
                        {
                            name: '股权转让总量',
                            type: 'line',
                            data: [3, 6, 3, 7, 5, 6.5, 4.5],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'}
                                ]
                            }
                        },
                        {
                            name: '基金转让总量',
                            type: 'line',
                            barWidth: 30,
                            data: [1, 4, 2, 5, 3, 2, 7],
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
            },
            toggleTabs(arg) {
                this.showTabs = arg;
            },
            toDetail(type,id) {
                this.$router.push({path: '/platform/detail/'+type+'/'+id});
            },
            // 获取基金列表
            async getHomeFund(page) {
                let data = await getHomeFund(page,this.pageSize);
                this.fundsList = data.data.data.content;
                this.fundsTotal = data.data.data.totalElements;
            },
            // 获取股权列表
            async getHomeEquity(page) {
                let data = await getHomeEquity(page,this.pageSize);
                this.equityList = data.data.data.content;
                this.equityTotal = data.data.data.totalElements;
                console.log(data);
            }
        },
        mounted() {
            this.chartFun();
            this.getHomeFund(1);
            this.getHomeEquity(1);
        }
    }
</script>

<style lang="scss" scoped>
    $color: #5f6ac0;
    #home{
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
                height:665px;
                padding: 0 20px 20px;
                margin-top: 20px;
                header{
                    height: 54px;
                    line-height: 54px;
                    text-align: center;
                    color: #fe5a04;
                }
                section{
                    li{
                        line-height: 30px;
                        height: 30px;
                        width: 160px;
                        text-align: center;
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
                    border: 1px solid $color;
                    width: 150px;
                    text-align: center;
                    cursor: pointer;
                    background-color: #fff;
                    color: $color;
                    &.current{
                        color: #fff;
                        background-color: $color;
                    }
                }
                button{
                    width: 120px;
                    height: 36px;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 4px;
                    background-color: $color;
                }
            }
            .recommend{
                padding: 10px 16px;
                h1{
                    height: 36px;
                    line-height: 36px;
                    img{
                        margin-top: 6px;
                        margin-right: 4px;
                    }
                }
                ul{
                    li{
                        width: 248px;
                        border: 1px solid #c5e4f7;
                        text-align: center;
                        padding: 10px 30px;
                        &:nth-child(2){
                            margin: 0 19px;
                        }
                        h2{
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                        }
                        h3{
                            height: 40px;
                            line-height: 40px;
                            border-bottom: 1px solid #c5e4f7;
                            color: #fe5a04;
                        }
                        h4{
                            height: 40px;
                            line-height: 40px;
                            color: #747474;
                        }
                        h5{
                            height: 50px;
                            line-height: 50px;
                            &.add{
                                color: #fe5a04;
                            }
                            &.subtract{
                                color: #106f00;
                            }
                            span{
                                font-size: 36px;
                            }
                        }
                    }
                }
            }
            .tableHeader{
                height: 40px;
                line-height: 40px;
                margin-top: 20px;
                padding-left: 20px;
                img{
                    margin-top: 7px;
                    margin-right: 4px;
                }
                .el-input{
                    width: 320px;
                }
                button{
                    width: 120px;
                    height: 36px;
                    cursor: pointer;
                    color: #fff;
                    border-radius: 4px;
                    background-color: $color;
                    margin-top: 2px;
                    margin-left: 10px;
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
                            background-color: #fd8238;
                        }
                    }
                    &:nth-child(even){
                        button{
                            background-color: #5f6ac0;
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
            margin-top: 24px;
            &.is-background .btn-prev,
            &.is-background .btn-next,
            &.is-background .el-pager li{
                background-color: #fff;
            }
            &.is-background .el-pager li:not(.disabled).active{
                background-color: #5f6ac0;
            }
        }
    }
</style>
