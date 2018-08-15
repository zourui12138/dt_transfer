<template>
    <div id="projectDetail">
        <header class="header card">
            <h1><img src="../../../assets/img/platform/leaves.png" alt=""><span>项目详情</span></h1>
            <ul class="clear">
                <li class="fl"><a :href="'/dist/GP/GPProjectChain?id='+productId
                                            +titleData.name
                                            +'&amount='+titleData.amount
                                            +'&pre='+(titleData.share*100).toFixed(2)
                                            +'&now_prise='+titleData.currAmount
                                            +'&add_prise='+titleData.reputation" target="_blank">
                    <img src="../../../assets/img/platform/chain_icon_green.png" alt=""></a><strong>{{titleData.name}}</strong>
                </li>
                <li class="fl">投资时间<span>{{titleData.startTime | dateFormat}}</span></li>
                <li class="fl">投资金额<span>{{titleData.amount | initNum}}万</span></li>
                <li class="fl">回报倍数<span>{{titleData.returnMultiple}}倍</span></li>
                <li class="fl">持股比例<span>{{(parseFloat(titleData.share).toFixed(2))*100}}%</span></li>
                <li class="fl">当前企元<span>{{titleData.currAmount | initNum}}万</span></li>
                <li class="fl">当前增元<span>{{titleData.reputation | initNum}}万</span></li>
            </ul>
        </header>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="operateReports">
                    <div class="title clear">
                        <strong class="fl"></strong>
                        <span class="fl">经营报表</span>
                    </div>
                    <div class="card">
                        <img src="../../../assets/img/platform/reports.png" alt="">
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="chart_bar">
                    <div class="title clear">
                        <strong class="fl"></strong>
                        <span class="fl">图表分析</span>
                    </div>
                    <div class="card" ref="castChart"></div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="projectProcess">
                    <div class="title orange clear">
                        <strong class="fl"></strong>
                        <span class="fl">项目进程</span>
                    </div>
                    <div class="card clear">
                        <div class="fl">
                            <div ref="chart1"></div>
                            <div ref="chart2"></div>
                        </div>
                        <div class="fr">
                            <el-table
                                class="tableList"
                                :data="projectProcessList"
                                header-cell-class-name="tableHeaderCell"
                                style="width: 100%">
                                <el-table-column width="80px">
                                    <template slot-scope="scope">
                                        <img @click="openProcessOnChainDialog(scope.row.id)" src="../../../assets/img/platform/chain_icon.png" alt="">
                                    </template>
                                </el-table-column>
                                <el-table-column label="ID">
                                    <template slot-scope="scope">
                                        <el-tag>{{scope.row.id}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="event" label="事件"></el-table-column>
                                <el-table-column prop="time" label="时间"></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <strong>{{scope.row.file}}</strong>
                                        <img src="../../../assets/img/platform/lock.png" alt="">
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                class="pagination"
                                background
                                layout="prev, pager, next"
                                :page-size="projectProcessListSize"
                                :total="projectProcessListTotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="15">
                <div class="operateConclusion">
                    <div class="title clear">
                        <strong class="fl"></strong>
                        <span class="fl">经营总结</span>
                    </div>
                    <div class="card">
                        <ul>
                            <li class="card" v-for="i in operateConclusion">
                                <h1>{{i.title}}</h1>
                                <p>{{i.businessSummary}}</p>
                                <h2>{{i.createTime | dateFormat}}</h2>
                            </li>
                        </ul>
                        <el-pagination
                            class="pagination"
                            background
                            layout="prev, pager, next"
                            :page-size="operateConclusionSize"
                            :total="operateConclusionTotal">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
            <el-col :span="9">
                <div>
                    <div class="title clear">
                        <strong class="fl"></strong>
                        <span class="fl">代办事项</span>
                    </div>
                    <div class="card clear">
                        <el-table
                            class="tableList"
                            :data="unfinishedEventList"
                            header-cell-class-name="tableHeaderCell"
                            style="width: 100%">
                            <el-table-column width="80px">
                                <template slot-scope="scope">
                                    <img @click="openUnfinishedOnChainDialog(scope.row.id)" src="../../../assets/img/platform/chain_icon.png" alt="">
                                </template>
                            </el-table-column>
                            <el-table-column label="ID">
                                <template slot-scope="scope">
                                    <el-tag>{{scope.row.id}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="event" label="事件"></el-table-column>
                            <el-table-column prop="time" label="时间"></el-table-column>
                            <el-table-column prop="percent" label="完成度"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="riskMsg">
                    <div class="title orange clear">
                        <strong class="fl"></strong>
                        <span class="fl">风险信息</span>
                    </div>
                    <Risk class="riskMsgBox"/>
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
                                    <h2>增资协议</h2>
                                    <h2>2018-06-30</h2>
                                </div>
                                <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                            </li>
                        </ul>
                        <h1>项目报表</h1>
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
            :visible.sync="process_onChainDialogVisible1">
            <div class="chainBox">
                <div class="title">{{process_onChain.title}}</div>
                <div class="message">
                    <div class="one">{{process_onChain.title}}</div>
                    <div class="two">名称：{{process_onChain.name}}</div>
                    <div class="two">编号：S20123</div>
                    <div class="two">投资机构：红杉资本中国</div>
                    <div class="two">方向：项目运营</div>
                    <div class="two">联系地址：{{process_onChain.address}}</div>
                    <div class="two">邮编：621000</div>
                </div>
                <div class="message">
                    <div class="one">上传的文件</div>
                    <ul class="clear">
                        <li class="fl" v-for="i in process_onChain.file">
                            <img src="../../../assets/img/platform/doc.png" alt="">
                            <h1>{{i}}</h1>
                        </li>
                    </ul>
                </div>
                <div class="message">
                    <div class="one">哈希值：{{process_onChain.hash}}</div>
                    <div class="two">业务类型：{{process_onChain.type}}</div>
                    <div class="two">操作类型：{{process_onChain.type}}</div>
                    <div class="two">发起方：{{process_onChain.name}}</div>
                    <div class="two">接收方：{{process_onChain.toName}}</div>
                    <div class="two">验证码：{{process_onChain.num}}</div>
                    <div class="two">注册时间：2017-09-09</div>
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
            title="链上信息"
            class="onChainDialog"
            width="992px"
            :visible.sync="unfinished_onChainDialogVisible1">
            <div class="chainBox">
                <div class="title">{{unfinished_onChain.title}}</div>
                <div class="message">
                    <div class="one">{{unfinished_onChain.title}}</div>
                    <div class="two">事项名称：{{unfinished_onChain.title}}</div>
                    <div class="two">事项编号：S20123</div>
                    <div class="two">事项名称：{{unfinished_onChain.title}}</div>
                    <div class="two">事项时间：2017-09-08</div>
                </div>
                <div class="message">
                    <div class="one">上传的文件</div>
                    <ul class="clear">
                        <li class="fl" v-for="i in unfinished_onChain.file">
                            <img src="../../../assets/img/platform/doc.png" alt="">
                            <h1>{{i}}</h1>
                        </li>
                    </ul>
                </div>
                <div class="message">
                    <div class="one">哈希值：{{unfinished_onChain.hash}}</div>
                    <div class="two">业务类型：{{unfinished_onChain.title}}</div>
                    <div class="two">操作类型：{{unfinished_onChain.title}}</div>
                    <div class="two">发起方：{{unfinished_onChain.name}}</div>
                    <div class="two">接收方：{{unfinished_onChain.toName}}</div>
                    <div class="two">验证码：{{unfinished_onChain.num}}</div>
                    <div class="two">注册时间：2017-09-09</div>
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
                <img v-show="overviewType === 2" src="../../../assets/img/platform/zengzixieyishu.jpg" alt="">
            </VuePerfectScrollbar>
        </el-dialog>
    </div>
</template>

<script>
    import Risk from '../../../components/Risk'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {
        fund_getProjectTitle,
        fund_getConclusion
    } from '../../../api/getData'

    export default {
        name: "ProjectDetail",
        components: {VuePerfectScrollbar,Risk},
        data() {
            return{
                roleId: null,
                productId: null,
                titleData: {},
                // 项目进程
                projectProcessList: [
                    {
                        id: 1,
                        event: '天使轮融资',
                        time: '2016-06-01',
                        file: '融资公告.pdf'
                    },
                    {
                        id: 2,
                        event: '年初财务报表',
                        time: '2017-05-01',
                        file: '财务报表.pdf'
                    },
                    {
                        id: 3,
                        event: 'A轮融资',
                        time: '2017-04-10',
                        file: '融资公告.pdf'
                    },
                    {
                        id: 4,
                        event: '触发对赌',
                        time: '2018-05-01',
                        file: '对赌合约.pdf'
                    },
                    {
                        id: 5,
                        event: 'B轮融资',
                        time: '2018-01-15',
                        file: '融资公告.pdf'
                    },
                    {
                        id: 6,
                        event: '财务增长',
                        time: '2018-08-01',
                        file: '经营报表.pdf'
                    }
                ],
                projectProcessListSize: 5,
                projectProcessListTotal: 5,
                process_onChainDialogVisible1: false,
                // 经营总结
                operateConclusion: [
                    {
                        title: '重大事件',
                        businessSummary: '目前，项目部进行强化管理，规范经营，团队建设和转变观念，为接下来工作打好基础，公司获取多笔融资，并用融资金额进行打扎打实的进行研发设备投入。',
                    }
                ],
                operateConclusionSize: 1,
                operateConclusionTotal: 1,
                // 代办事项
                unfinishedEventList: [
                    {
                        id: 1,
                        event: '银行开户',
                        time: '2016-06-01',
                        percent: '10%'
                    },
                    {
                        id: 2,
                        event: '协议备案',
                        time: '2018-06-10',
                        percent: '30%'
                    },
                    {
                        id: 3,
                        event: '工商变更',
                        time: '2018-06-20',
                        percent: '40%'
                    },
                    {
                        id: 4,
                        event: '增值发放',
                        time: '2018-07-01',
                        percent: '80%'
                    },
                ],
                unfinishedEventListSize: 5,
                unfinishedEventListTotal: 5,
                unfinished_onChainDialogVisible1: false,
                // 相关文件
                documents_onChainDialogVisible1: false,
                overviewDialogVisible: false,
                overviewType: 1,
                // 项目进程链上信息
                process_onChain: {},
                // 代办事项
                unfinished_onChain: {},
                // 相关文件
                documents_onChain: {}
            }
        },
        methods: {
            chartBar(dom) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(dom);
                // 图表配置项
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['财务统计','行业统计'],
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
                        boundaryGap: true,
                        data: ['2017-01','2017-02','2017-03','2017-04','2017-05','2017-06','2017-07','2017-08','2017-09','2017-10']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#4367f6','#fd8944'],
                    series: [
                        {
                            name: '财务统计',
                            type: 'bar',
                            data: [10, 15, 25, 40, 65, 70, 75, 80, 85, 90]
                        },
                        {
                            name: '行业统计',
                            type: 'bar',
                            data: [20, 25, 35, 45, 65, 75, 75, 85, 95, 100]
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            lineChartOne() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.chart1);
                // 图表配置项
                let option = {
                    title: {
                        text: "企元统计图",
                        textStyle: {
                            color: "#ff8b39",
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                        right: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    grid: {
                        left: '25px',
                        right: '30px',
                        bottom: '2%',
                        top: '50px',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },

                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14,
                                    color: 'rgb(105,105,105)'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            data: ['2016-5-1', '2016-6-1', '2017-4-20', '2018-1-15','2018-8-1']
                        }],
                    yAxis: [{
                        name: '(万)',
                        type: 'value',
                        nameTextStyle:{
                            color:'black'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#eaeaea'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14,
                                color: 'rgb(105,105,105)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eaeaea'
                            }
                        }
                    },
                        {
                            name: '',
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14,
                                    color: 'rgb(105,105,105)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            }
                        }],
                    series: [
                        {
                            name: '企元',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: true,
                            lineStyle: {
                                color: '#ff8b39'
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(255, 139, 57, 0.1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255, 139, 57, 0.1)'
                                    }], false),
                                }
                            },
                            itemStyle: {
                                borderWidth: 4,
                                symbolSize: 4,
                                normal: {
                                    color: '#ff8b39',
                                    borderColor: '#ff8b39',
                                    borderWidth: 4
                                }
                            },
                            data: [3000, 3100, 11100, 16100,30100]
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            lineChartTwo() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.chart2);
                // 图表配置项
                let option = {
                    title: {
                        text: "增元统计图",
                        textStyle: {
                            color: "#47a2ff",
                            fontWeight: 'normal',
                            fontSize: 16
                        },
                        right: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    grid: {
                        left: '25px',
                        right: '30px',
                        bottom: '2%',
                        top: '50px',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },

                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14,
                                    color: 'rgb(105,105,105)'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            data: ['2016/5/1', '2017/5/1','2018/5/1']
                        }],
                    yAxis: [{
                        name: '(万)',
                        nameTextStyle:{
                            color:'black'
                        },
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#eaeaea'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14,
                                color: 'rgb(105,105,105)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eaeaea'
                            }
                        }
                    },
                        {
                            name: '',
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14,
                                    color: 'rgb(105,105,105)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#eaeaea'
                                }
                            }
                        }],
                    series: [
                        {
                            name: '增元',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: true,
                            lineStyle: {
                                color: '#47a2ff'
                            },
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(71, 162, 255, 0.1)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(71, 162, 255, 0.1)'
                                    }], false),
                                }
                            },
                            itemStyle: {
                                borderWidth: 4,
                                symbolSize: 4,
                                normal: {
                                    color: '#47a2ff',
                                    borderColor: '#47a2ff',
                                    borderWidth: 4
                                }
                            },
                            data: [0, 1110,2720]
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            // 链上信息弹框--项目进程
            openProcessOnChainDialog(arg) {
                this.process_onChainDialogVisible1 = true;
                arg === 1 && (this.process_onChain = {
                    title: '天使轮融资',
                    name: '李希伟',
                    toName: '吴建国',
                    type: '天使轮融资',
                    file: ['融资公告.pdf'],
                    address: '天府三街',
                    num: '4566786',
                    hash: '56uulm86j8inryo7kjyhgtc4q67ug4'
                });
                arg === 2 && (this.process_onChain = {
                    title: '年初财务报表',
                    name: '吴建国',
                    toName: '刘向东',
                    type: '年初财务报表',
                    file: ['财务报表.pdf'],
                    address: '郫县',
                    num: '567876',
                    hash: 'ulm86j8inryo7kjyhgtc4q56u67ug4'
                });
                arg === 3 && (this.process_onChain = {
                    title: 'A轮融资',
                    name: '刘向东',
                    toName: '吴宇伟',
                    type: 'A轮融资',
                    file: ['融资公告.pdf'],
                    address: '龙泉驿',
                    num: '83247027',
                    hash: 'inryoulm86j87kjyhgtc4q56u67ug4'
                });
                arg === 4 && (this.process_onChain = {
                    title: '触发对赌',
                    name: '吴宇伟',
                    toName: '李希伟',
                    type: '触发对赌',
                    file: ['对赌合约.pdf'],
                    address: '天府一街',
                    num: '4356687',
                    hash: 'youlm86j87kjyhgtc4q56u67uinrg4'
                });
                arg === 5 && (this.process_onChain = {
                    title: 'B轮融资',
                    name: '王宇凡',
                    toName: '吴宇伟',
                    type: 'B轮融资',
                    file: ['融资公告.pdf'],
                    address: '郫县',
                    num: '567876',
                    hash: '86j87kjyhgtc4q56u67uiyoulmnrg4'
                });
                arg === 6 && (this.process_onChain = {
                    title: '财务增长',
                    name: '王静',
                    toName: '吴建国',
                    type: '财务增长',
                    file: ['经营报表.pdf'],
                    address: '高新区',
                    num: '7637387',
                    hash: 'c4q56u6786j87kjyhgtuiyoulmnrg4'
                });
            },
            // 链上信息弹框--项目进程
            openUnfinishedOnChainDialog(arg) {
                this.unfinished_onChainDialogVisible1 = true;
                arg === 1 && (this.unfinished_onChain = {
                    title: '银行开户',
                    name: '李希伟',
                    toName: '吴建国',
                    file: ['开户协议.pdf'],
                    num: '4566786',
                    hash: '56uulm86j8inryo7kjyhgtc4q67ug4'
                });
                arg === 2 && (this.unfinished_onChain = {
                    title: '协议备案',
                    name: '吴建国',
                    toName: '刘向东',
                    file: ['备案协议.pdf'],
                    num: '567876',
                    hash: 'ulm86j8inryo7kjyhgtc4q56u67ug4'
                });
                arg === 3 && (this.unfinished_onChain = {
                    title: '工商变更',
                    name: '刘向东',
                    toName: '吴宇伟',
                    file: ['股权转让协议.pdf'],
                    num: '83247027',
                    hash: 'inryoulm86j87kjyhgtc4q56u67ug4'
                });
                arg === 4 && (this.unfinished_onChain = {
                    title: '增值发放',
                    name: '吴宇伟',
                    toName: '李希伟',
                    file: ['增资协议.pdf'],
                    num: '4356687',
                    hash: 'youlm86j87kjyhgtc4q56u67uinrg4'
                });
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
                    title: '增资协议',
                    name: '吴建国',
                    toName: '刘向东',
                    file: ['增资协议.pdf'],
                    hash: 'ulm86j8inryo7kjyhgtc4q56u67ug4'
                });
            },
            // 文件预览
            openOverviewOnChainDialog(arg) {
                this.overviewType = arg;
                this.overviewDialogVisible = true;
            },
            // 获取经营总结
            async getConclusion(page) {
                let data = await fund_getConclusion(this.productId,page,this.operateConclusionSize);
                this.operateConclusion = data.data.data.data;
                this.operateConclusionTotal = data.data.data.total;
            },
            // 获取项目详情
            async getProjectTitle() {
                let data = await fund_getProjectTitle(this.roleId,this.productId);
                this.titleData = data.data.data;
                console.log(data);
            }
        },
        mounted() {
            this.roleId = this.$route.query.roleId;
            this.productId = this.$route.query.productId;
            this.chartBar(this.$refs.castChart);
            this.lineChartOne();
            this.lineChartTwo();
            this.getProjectTitle();
            this.getConclusion(1);
        }
    }
</script>

<style lang="scss" scoped>
    #projectDetail{
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
                height: 72px;
                line-height: 72px;
                li{
                    padding-left: 20px;
                    width: calc(13% - 20px);
                    overflow: hidden;
                    &:first-child{
                        width: calc(22% - 20px);
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
        .operateReports{
            .card{
                height: 394px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
        .chart_bar{
            .card{
                height: 394px;
            }
        }
        .projectProcess{
            .card{
                padding: 20px;
                >div:first-child{
                    width: 650px;
                    >div{
                        height: 221px;
                    }
                }
                >div:last-child{
                    width: calc(100% - 700px);
                }
            }
        }
        .operateConclusion{
            >.card{
                padding: 20px 20px 10px;
                height: 246px;
                ul{
                    li{
                        padding: 20px;
                        &:not(:last-child){
                            margin-bottom: 10px;
                        }
                        h1{
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                        }
                        p{
                            line-height: 26px;
                            height: 78px;
                            overflow: hidden;
                        }
                        h2{
                            text-align: right;
                            height: 26px;
                            line-height: 26px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .riskMsg{
            position: relative;
            height: 420px;
            .riskMsgBox{
                position: absolute;
                top: 50px;
                left: -10px;
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
    #projectDetail{
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
