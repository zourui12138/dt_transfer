<template>
    <div id="fundDetail">
        <header class="header card">
            <h1><img src="../../../assets/img/platform/leaves.png" alt=""><span>基金详情</span></h1>
            <ul class="clear">
                <li class="fl"><a :href="'/dist/#/GP/GPFundChain?id='+productId" target="_blank"><img src="../../../assets/img/platform/chain_icon_purple.png" alt=""></a><strong>{{fundTitle.name}}</strong></li>
                <li class="fl">投资时间<span>{{fundTitle.startTime | dateFormat}}</span></li>
                <li class="fl">总规模<span>{{fundTitle.amount | initNum}}万</span></li>
                <li class="fl">已投金额<span>{{fundTitle.ytAmout | initNum}}万</span></li>
                <li class="fl">剩余可投金额<span>{{fundTitle.ktAmount | initNum}}万</span></li>
                <li class="fl">已投项目<span>{{fundTitle.cpcount}}</span></li>
                <li class="fl">回报倍数<span>{{fundTitle.percentage}}倍</span></li>
                <li class="fl">IRR<span>{{fundTitle.irr}}%</span></li>
                <li class="fl">预计退出时间<span>{{fundTitle.time | dateFormat}}</span></li>
            </ul>
        </header>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="title clear">
                    <strong class="fl"></strong>
                    <span class="fl">项目列表</span>
                </div>
                <div class="card">
                    <el-table
                        class="tableList"
                        :data="projectList"
                        header-cell-class-name="tableHeaderCell"
                        highlight-current-row
                        style="width: 100%">
                        <el-table-column width="400px" label="项目名称">
                            <template slot-scope="scope">
                                <a :href="'/dist/#/GP/GPProjectChain?name='
                                            +scope.row.name
                                            +'&amount='+scope.row.amount
                                            +'&pre='+(scope.row.percentage*100).toFixed(2)
                                            +'&now_prise='+scope.row.currAmount
                                            +'&add_prise='+scope.row.reputation" target="_blank">
                                    <img class="onChainMsg" src="../../../assets/img/platform/chain_icon_green.png" alt="">
                                </a>
                                <strong>{{scope.row.name}}</strong>
                            </template>
                        </el-table-column>
                        <el-table-column label="投资时间">
                            <template slot-scope="scope">{{scope.row.time | dateFormat}}</template>
                        </el-table-column>
                        <el-table-column label="投资金额(万)">
                            <template slot-scope="scope"><span>{{scope.row.amount | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="持股比例">
                            <template slot-scope="scope">{{(scope.row.percentage*100).toFixed(2)+'%'}}</template>
                        </el-table-column>
                        <el-table-column label="企元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.currAmount | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="增元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.reputation | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="回报倍数">
                            <template slot-scope="scope"><span>{{scope.row.returnMultiple+'倍'}}</span></template>
                        </el-table-column>
                        <el-table-column label="IRR">
                            <template slot-scope="scope"><span>{{scope.row.irr+'%'}}</span></template>
                        </el-table-column>
                        <el-table-column width="180px" label="承诺业绩">
                            <template slot-scope="scope">2018年净利润{{scope.row.commitmenPerformance | initNum}}</template>
                        </el-table-column>
                        <el-table-column label="完成情况">
                            <template slot-scope="scope"><span>{{(scope.row.completion*100).toFixed(2)}}%</span></template>
                        </el-table-column>
                        <el-table-column label="详情">
                            <template slot-scope="scope"><img @click="toProjectDetail(scope.row.productId,fundTitle.roleId)" src="../../../assets/img/platform/detail_icon.png" alt=""></template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        class="pagination"
                        background
                        layout="prev, pager, next"
                        @current-change="getProject"
                        :page-size="projectListSize"
                        :total="projectListTotal">
                    </el-pagination>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="chart">
                    <div class="title orange clear">
                        <strong class="fl"></strong>
                        <span class="fl">投资进程</span>
                    </div>
                    <div class="card" ref="pieChart"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="chart">
                    <div class="title orange clear">
                        <strong class="fl"></strong>
                        <span class="fl">投资项目地区分布</span>
                    </div>
                    <div class="card" ref="barChartOne"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="chart">
                    <div class="title orange clear">
                        <strong class="fl"></strong>
                        <span class="fl">投资项目行业分布</span>
                    </div>
                    <div class="card" ref="barChartTwo"></div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="relevantDocuments">
                    <div class="title clear">
                        <strong class="fl"></strong>
                        <span class="fl">相关文件</span>
                    </div>
                    <div class="card">
                        <h1>合同文件</h1>
                        <ul class="clear">
                            <li class="fl" @click="openOverviewOnChainDialog(1)">
                                <img @click.stop="openDocumentsOnChainDialog(1)" src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>保密协议</h2>
                                    <h2>2018-06-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                            <li class="fl" @click="openOverviewOnChainDialog(2)">
                                <img @click.stop="openDocumentsOnChainDialog(2)" src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>托管协议</h2>
                                    <h2>2018-06-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                            <li class="fl" @click="openOverviewOnChainDialog(3)">
                                <img @click.stop="openDocumentsOnChainDialog(3)" src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>合伙协议</h2>
                                    <h2>2018-06-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                        </ul>
                        <h1>基金报表</h1>
                        <ul class="clear">
                            <li class="fl disabled">
                                <img src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>2018.03月报</h2>
                                    <h2>2018-03-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                            <li class="fl disabled">
                                <img src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>2018.04月报</h2>
                                    <h2>2018-04-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                            <li class="fl disabled">
                                <img src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>2018.05月报</h2>
                                    <h2>2018-05-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                        </ul>
                        <h1>其他文件</h1>
                        <ul class="clear">
                            <li class="fl disabled">
                                <img src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>沟通记录</h2>
                                    <h2>2018-05-20</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                            <li class="fl disabled">
                                <img src="../../../assets/img/platform/chain_icon.png" alt="">
                                <div class="fl">
                                    <h2>会议记录</h2>
                                    <h2>2018-05-21</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-dialog
            title="链上信息"
            class="onChainDialog"
            width="992px"
            :visible.sync="documents_onChainDialogVisible1">
            <div class="chainBox">
                <div class="title">{{documents_onChain.title}}</div>
                <div class="message">
                    <div class="one">文件描述</div>
                    <div class="two">双发达成意向签订合约</div>
                </div>
                <div class="message">
                    <div class="one">上传的文件</div>
                    <ul class="clear">
                        <li class="fl" v-for="i in documents_onChain.file">
                            <img src="../../../assets/img/platform/doc.png" alt="">
                            <h1>{{i}}</h1>
                        </li>
                    </ul>
                </div>
                <div class="message">
                    <div class="one">哈希值：{{documents_onChain.hash}}</div>
                    <div class="two">业务类型：协议签订</div>
                    <div class="two">操作类型：协议签订</div>
                    <div class="two">甲方：{{documents_onChain.name}}</div>
                    <div class="two">乙方：{{documents_onChain.toName}}</div>
                    <div class="two">签约时间：2017-09-09</div>
                </div>
                <div class="message">
                    <div class="one">共识信息</div>
                    <div class="three">共识确认节点</div>
                    <div class="three">共识确认时间</div>
                    <div class="three">共识确认状态</div>
                    <div class="three">节点1</div>
                    <div class="three">2017-09-18 14:30</div>
                    <div class="three">已确认</div>
                    <div class="three">节点2</div>
                    <div class="three">2017-09-18 14:06</div>
                    <div class="three">已确认</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="预览"
            class="fundsManageOverviewDialog"
            :visible.sync="overviewDialogVisible">
            <VuePerfectScrollbar class="overviewDialogBox">
                <img v-show="overviewType === 1" src="../../../assets/img/platform/baomixieyi.jpg" alt="">
                <img v-show="overviewType === 2" src="../../../assets/img/platform/tuoguan1.png" alt="">
                <img v-show="overviewType === 3" src="../../../assets/img/platform/youxianhehuo.png" alt="">
            </VuePerfectScrollbar>
        </el-dialog>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {
        fund_getTitle,
        fund_getProject,
        fund_getDistribution,
        fund_getIndustry
    } from '../../../api/getData'

    export default {
        name: "FundDetail",
        components: {VuePerfectScrollbar},
        data() {
            return{
                roleId: null,
                productId: null,
                // 基金信息
                fundTitle: {},
                // 项目列表
                projectList: [],
                projectListSize: 5,
                projectListTotal: 5,
                // 项目分布
                distributionList: [],
                distributionListSize: 5,
                distributionListTotal: 5,
                // 相关文件
                documents_onChainDialogVisible1: false,
                overviewDialogVisible: false,
                overviewType: 1,
                // 相关文件--链上信息
                documents_onChain: {}
            }
        },
        methods: {
            pieChart() {
                let myChart = this.$echarts.init(this.$refs.pieChart);
                let option = {
                    backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'horizontal',
                        top: 16,
                        selectedMode: false,
                        data: ['可投金额', '在管部分', '已退出']
                    },
                    series: [{
                        type: 'pie',
                        radius: ['0', '67%'],
                        color: ['#69c3dd', '#fd6b6d', '#f7c92e'],
                        label: {
                            show: true,
                            formatter: '{b}:{d}%',

                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            {name:'可投金额',value:5},
                            {name:'在管部分',value:50},
                            {name:'已退出',value:12}
                        ]
                    }]
                };
                myChart.setOption(option);
            },
            barChartOne(x,y) {
                let myChart = this.$echarts.init(this.$refs.barChartOne);
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 10,
                        top: 30,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        show: false,
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: x
                    },
                    color: ['rgb(111, 135, 213)'],
                    series: [
                        {
                            name: '地区分布',
                            type: 'bar',
                            barWidth: 40,
                            barCategoryGap: 10,
                            data: y
                        }
                    ]
                };
                myChart.setOption(option);
            },
            barChartTwo(x,y) {
                let myChart = this.$echarts.init(this.$refs.barChartTwo);
                let option = {
                    color: ['#61a0a9'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : x,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'行业分布',
                            type:'bar',
                            barWidth: 40,
                            data:y
                        }
                    ]
                };
                myChart.setOption(option);
            },
            // 链上信息弹框--相关文件
            openDocumentsOnChainDialog(arg) {
                this.documents_onChainDialogVisible1 = true;
                arg === 1 && (this.documents_onChain = {
                    title: '保密协议',
                    name: '李希伟',
                    toName: '吴建国',
                    file: ['保密协议.pdf'],
                    hash: '56uulm86j8inryo7kjyhgtc4q67ug4'
                });
                arg === 2 && (this.documents_onChain = {
                    title: '托管协议',
                    name: '吴建国',
                    toName: '刘向东',
                    file: ['托管协议.pdf'],
                    hash: 'ulm86j8inryo7kjyhgtc4q56u67ug4'
                });
                arg === 3 && (this.documents_onChain = {
                    title: '合伙协议',
                    name: '李希伟',
                    toName: '刘静',
                    file: ['合伙协议.pdf'],
                    hash: 'gtc4q56u67ulm86j8inryo7kjyhug4'
                });
            },
            // 文件预览
            openOverviewOnChainDialog(arg) {
                this.overviewType = arg;
                this.overviewDialogVisible = true;
            },
            // 获取基金详情
            async getFundTitle() {
                let data = await fund_getTitle(this.roleId,this.productId);
                this.fundTitle = data.data.data;
            },
            // 获取基金关联项目
            async getProject(page) {
                let data = await fund_getProject(this.productId,page,this.projectListSize);
                this.projectList = data.data.data.data;
                this.distributionListTotal = data.data.data.total;
            },
            // 获取项目分布
            async getDistribution() {
                let data = await fund_getDistribution(this.productId);
                let x = [],y = [];
                data.data.data.forEach((value) => {
                    x.push(value.name);
                    y.push(value.count);
                });
                this.barChartOne(x,y);
            },
            // 获取项目行业分布
            async getIndustry() {
                let data = await fund_getIndustry(this.productId);
                let x = [], y = [];
                data.data.data.forEach((value) => {
                    x.push(value.name);
                    y.push(value.count);
                });
                this.barChartTwo(x,y);
            },
            // 前往项目详情
            toProjectDetail(productId,roleId) {
                this.$router.push({path:'/platform/projectDetail',query: {productId:productId,roleId:roleId}});
            }
        },
        mounted() {
            this.pieChart();
            this.roleId = this.$route.query.roleId;
            this.productId = this.$route.query.productId;
            this.getFundTitle();
            this.getProject(1);
            this.getDistribution();
            this.getIndustry();
        }
    }
</script>

<style lang="scss" scoped>
    #fundDetail{
        .tableList{
            span{
                color: #ed6a25;
            }
            em{
                font-size: 20px;
                color: #409eff;
                cursor: pointer;
            }
            .portrait{
                vertical-align: middle;
                width: 46px;
                height: 46px;
                margin-right: 8px;
            }
            .onChainMsg{
                vertical-align: middle;
                margin-right: 4px;
            }
        }
        .header{
            padding: 0 20px 20px;
            h1{
                height: 40px;
                line-height: 40px;
                img{
                    margin-top: 10px;
                    margin-right: 10px;
                }
            }
            ul{
                border: 1px solid #eaeaeb;
                height: 144px;
                line-height: 72px;
                li{
                    padding-left: 20px;
                    width: calc(12.5% - 20px);
                    overflow: hidden;
                    &:first-child{
                        width: calc(100% - 20px);
                    }
                    strong{
                        font-size: 20px;
                        font-weight: normal;
                    }
                    span{
                        color: #ed6a25;
                        margin-left: 20px;
                    }
                    img{
                        margin-top: 24px;
                        margin-right: 4px;
                        cursor: pointer;
                    }
                }
            }
        }
        .title{
            height: 50px;
            line-height: 50px;
            strong{
                width: 16px;
                height: 16px;
                background-color: #4e9ffa;
                margin-right: 8px;
                margin-top: 17px;
            }
            &.orange{
                strong{
                    background-color: #fd8944;
                }
            }
            &.brown{
                strong{
                    background-color: #cc9f66;
                }
            }
        }
        .chart{
            .card{
                height: 400px;
            }
        }
        .relevantDocuments{
            .card{
                padding: 20px;
                h1{
                    width: 80px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 16px;
                    border-bottom: 2px solid #409eff;
                    margin-bottom: 20px;
                }
                ul{
                    li{
                        width: 170px;
                        padding: 20px 10px 20px 60px;
                        background: #f6f6f6;
                        position: relative;
                        cursor: pointer;
                        margin-right: 20px;
                        &.disabled{
                            cursor: not-allowed;
                            background: #d6d6d6;
                        }
                        img:first-child{
                            position: absolute;
                            top: 10px;
                            left: 10px;
                        }
                        h2{
                            height: 29px;
                            line-height: 29px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        // 链上信息
        .chainBox {
            width: 950px;
            height: 294px;
            border: 1px solid #3c73ff;
            border-radius: 5px;
            .title {
                padding-left: 15px;
                height: 40px;
                line-height: 40px;
                color: #e57a68;
                background: none;
            }
            > .message {
                width: 460px;
                height: 120px;
                background: #f9f9f9;
                float: left;
                margin-left: 10px;
                margin-bottom: 10px;
                &:nth-child(2) {
                    margin-left: 15px;
                }
                &:nth-child(4) {
                    margin-left: 15px;
                }
                .one {
                    width: 80%;
                    padding-left: 15px;
                    height: 28px;
                    line-height: 28px;
                    padding-top: 10px;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
                }
                .two {
                    float: left;
                    padding-left: 15px;
                    width: calc(50% - 15px);
                    height: 24px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
                }
                .three {
                    float: left;
                    padding-left: 15px;
                    width: calc(33% - 15px);
                    height: 24px;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
                }
                ul{
                    li{
                        width: 33%;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    #fundDetail{
        .tableHeaderCell{
            background-color: #f7f9ff;
        }
        .pagination{
            text-align: right;
            padding: 12px 0;
        }
        .onChainDialog{
            .el-dialog{
                .el-dialog__header{
                    background-color: #409eff;
                    .el-dialog__title{
                        color: #fff;
                    }
                    .el-dialog__headerbtn .el-dialog__close{
                        color: #fff;
                    }
                }
                .el-dialog__body{
                    span{
                        color: #ed6a25;
                    }
                }
            }
        }
        .fundsManageOverviewDialog{
            .el-dialog{
                .el-dialog__header{
                    background-color: #409eff;
                    .el-dialog__title{
                        color: #fff;
                    }
                    .el-dialog__headerbtn .el-dialog__close{
                        color: #fff;
                    }
                }
                .el-dialog__body{
                    span{
                        color: #ed6a25;
                    }
                }
            }
            .overviewDialogBox{
                height: 660px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
