<template>
    <div id="home" class="clear">
        <div class="left fl">
            <div class="title clear">
                <img class="fl" src="../../../assets/img/platform/recommend.png" alt="">
                <strong class="fl">热门推荐</strong>
            </div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="card hot_box hot_box_one">
                        <h2>启辰君联人民币五期创新基金-明诺</h2>
                        <h4 class="clear">
                            <s class="fl">IRR</s>
                            <strong class="fl">27.59</strong>
                            <span class="fl">%</span>
                        </h4>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="card hot_box hot_box_two">
                        <h2>好买中金启辰新兴产业基金</h2>
                        <h4 class="clear">
                            <s class="fl">IRR</s>
                            <strong class="fl">12.59</strong>
                            <span class="fl">%</span>
                        </h4>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="card hot_box hot_box_three">
                        <h2>启辰顶级资源母基金五期-荣言</h2>
                        <h4 class="clear">
                            <s class="fl">IRR</s>
                            <strong class="fl">15.59</strong>
                            <span class="fl">%</span>
                        </h4>
                    </div>
                </el-col>
            </el-row>
            <div class="fundsList">
                <div class="title clear">
                    <img class="fl" src="../../../assets/img/platform/fund.png" alt="">
                    <strong class="fl">基金份额转让</strong>
                    <el-button class="fr" type="primary" size="small" icon="el-icon-search">搜索</el-button>
                    <el-input class="fr" placeholder="请输入内容" v-model="fundSearch" clearable size="small"></el-input>
                </div>
                <div class="card">
                    <el-table
                        class="tableList"
                        :data="fundsList"
                        header-cell-class-name="tableHeaderCell"
                        style="width: 100%">
                        <el-table-column prop="seller" label="卖方"></el-table-column>
                        <el-table-column prop="name" label="基金名"></el-table-column>
                        <el-table-column prop="managementAgency" label="管理机构"></el-table-column>
                        <el-table-column width="150px" label="出售份额(份)">
                            <template slot-scope="scope"><strong>{{scope.row.share | initNum}}</strong></template>
                        </el-table-column>
                        <el-table-column width="150px" label="企元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.enterpriseAssets | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column width="150px" label="增元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.addAssets | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column width="150px" label="要价(万)">
                            <template slot-scope="scope"><span>{{scope.row.price | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="交易" width="100px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="toDetail('fund',scope.row.fundId)">交易</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        class="pagination"
                        background
                        layout="prev, pager, next"
                        @current-change="getHomeFund"
                        :page-size="fundsListSize"
                        :total="fundsListTotal">
                    </el-pagination>
                </div>
            </div>
            <div class="projectsList">
                <div class="title clear">
                    <img class="fl" src="../../../assets/img/platform/project.png" alt="">
                    <strong class="fl">项目股权转让</strong>
                    <el-button class="fr" type="primary" size="small" icon="el-icon-search">搜索</el-button>
                    <el-input class="fr" placeholder="请输入内容" v-model="projectSearch" clearable size="small"></el-input>
                </div>
                <div class="card">
                    <el-table
                        class="tableList"
                        :data="projectsList"
                        header-cell-class-name="tableHeaderCell"
                        style="width: 100%">
                        <el-table-column prop="seller" label="卖方"></el-table-column>
                        <el-table-column prop="projectName" label="项目名"></el-table-column>
                        <el-table-column label="转让股权比例">
                            <template slot-scope="scope"><strong>{{scope.row.share+'%'}}</strong></template>
                        </el-table-column>
                        <el-table-column label="企元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.enterpriseAssets | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="增元价值(万)">
                            <template slot-scope="scope"><span>{{scope.row.addAssets | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="要价(万)">
                            <template slot-scope="scope"><span>{{scope.row.price | initNum}}</span></template>
                        </el-table-column>
                        <el-table-column label="交易" width="100px">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="toDetail('project',scope.row.projectId)">交易</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        class="pagination"
                        background
                        layout="prev, pager, next"
                        @current-change="getHomeProjects"
                        :page-size="projectsListSize"
                        :total="projectsListTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="right fr">
            <div class="title clear">
                <img class="fl" src="../../../assets/img/platform/chart.png" alt="">
                <strong class="fl">交易量统计图</strong>
            </div>
            <div class="chart card" ref="chart"></div>
            <div class="title clear">
                <img class="fl" src="../../../assets/img/platform/good.png" alt="">
                <strong class="fl">优选投资</strong>
            </div>
            <ul class="goodInvest">
                <li class="card" v-for="i in goodInvest">
                    <img src="../../../assets/img/platform/tag.png" alt="">
                    <h1 @click="openDialog('123')">{{i.name}}</h1>
                    <h2><strong>{{i.type === 'project' ? '股权比例' : '出让份额(万)'}}</strong><span>{{i.share+(i.type === 'project' ? '%' : '')}}</span></h2>
                    <h2>要价(万)<span>{{i.price | initNum}}</span></h2>
                    <h3><button type="button" :class="i.type" @click="toDetail(i.type,i.id)">了解更多</button></h3>
                    <img v-if="i.type === 'fund'" src="../../../assets/img/platform/fund_icon.png" alt="">
                    <img v-if="i.type === 'project'" src="../../../assets/img/platform/project_icon.png" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        getHomeFund,
        getHomeProjects,
        getAllList
    } from '../../../api/getData'

    export default {
        name: "Home",
        data() {
            return{
                fundsList: [],
                fundsListSize: 6,
                fundsListTotal: null,
                projectsList: [],
                projectsListSize: 6,
                projectsListTotal: null,
                fundSearch: '',
                projectSearch: '',
                goodInvest: []
            }
        },
        methods: {
            chartFun() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.chart);
                // 图表配置项
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['基金成交总金额', '股权成交总金额'],
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
                    color: ['#fe5a04','#5f6ac0'],
                    series: [
                        {
                            name: '基金成交总金额',
                            type: 'bar',
                            data: [3, 6, 3, 7, 5, 6.5, 4.5]
                        },
                        {
                            name: '股权成交总金额',
                            type: 'bar',
                            data: [4, 3, 8, 10, 1, 4.5, 9]
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            // 获取基金列表
            async getHomeFund(page) {
                let data = await getHomeFund(page,this.fundsListSize);
                this.fundsList = data.data.data.content;
                this.fundsListTotal = data.data.data.totalElements;
            },
            // 获取项目列表
            async getHomeProjects(page) {
                let data = await getHomeProjects(page,this.projectsListSize);
                this.projectsList = data.data.data.content;
                this.projectsListTotal = data.data.data.totalElements;
            },
            // 获取优选投资
            async getGoodInvest() {
                let data = await getAllList(1,4,'','股权','','','','','','','','');
                this.goodInvest = data.data.data.content;
            },
            // 进入详情页面
            toDetail(type,id) {
                this.$router.push({path: '/platform/detail',query: {type: type,id:id}});
            }
        },
        mounted() {
            this.chartFun();
            this.getHomeFund(1);
            this.getHomeProjects(1);
            this.getGoodInvest();
        }
    }
</script>

<style lang="scss" scoped>
    $color: #5f6ac0;
    @function imgUrl($name){
        @return '../../../assets/img/platform/'+$name
    }
    #home{
        .title{
            height: 40px;
            line-height: 40px;
            img{
                margin-top: 7px;
                margin-right: 10px;
            }
            .el-input{
                width: 320px;
            }
            .el-button{
                margin-top: 4px;
                margin-left: 10px;
            }
        }
        .left{
            width: 1519px;
            .hot_box{
                height: 168px;
                padding: 30px 40px;
                margin-bottom: 20px;
                h2{
                    font-size: 24px;
                    height: 50px;
                    line-height: 50px;
                }
                h3{
                    font-size: 16px;
                    color: #fe5a04;
                    height: 40px;
                    line-height: 40px;
                }
                h4{
                    height: 50px;
                    line-height: 50px;
                    s{
                        text-decoration: none;
                    }
                    span{
                        color: #fe5a04;
                    }
                    strong{
                        color: #fe5a04;
                        font-size: 30px;
                        margin-left: 20px;
                        margin-right: 4px;
                    }
                }
                &.hot_box_one{
                    background: url(imgUrl('hot_one.png')) no-repeat center;
                }
                &.hot_box_two{
                    background: url(imgUrl('hot_two.png')) no-repeat center;
                }
                &.hot_box_three{
                    background: url(imgUrl('hot_three.png')) no-repeat center;
                }
            }
            .tableList{
                span{
                    color: #fe5a04;
                }
                strong{
                    color: $color;
                }
            }
            .fundsList{
                .title{
                    margin-bottom: 10px;
                }
            }
            .projectsList{
                .title{
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            }
        }
        .right{
            width: 330px;
            .chart{
                height: 228px;
                margin-bottom: 20px;
            }
            .goodInvest{
                li{
                    position: relative;
                    padding: 10px 30px;
                    img{
                        position: absolute;
                        &:first-child{
                            top: 0;
                            right: 20px;
                        }
                        &:last-child{
                            bottom: 20px;
                            right: 10px;
                        }
                    }
                    h1{
                        height: 50px;
                        line-height: 50px;
                        font-size: 18px;
                        overflow: hidden;
                    }
                    h2{
                        height: 50px;
                        line-height: 50px;
                        span{
                            font-size: 30px;
                            color: #fe5a04;
                            margin-left: 20px;
                            margin-right: 10px;
                        }
                        strong{
                            font-weight: normal;
                        }
                    }
                    h3{
                        height: 50px;
                        line-height: 50px;
                        button{
                            height: 30px;
                            width: 100px;
                            border-radius: 15px;
                            color: #fff;
                            &.fund{
                                background-color: $color;
                            }
                            &.project{
                                background-color: #fd8238;
                            }
                        }
                    }
                    &:not(:first-child){
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    #home{
        .tableHeaderCell{
            background-color: #f7f9ff;
        }
        .pagination{
            text-align: right;
            margin: 11px 0;
        }
    }
</style>
