<template>
    <div id="content">
        <div class="chart1" style="position: relative">
            <div class="title">项目当前风险指数</div>
            <span class="" @click="openzhengshu(5)" style="    cursor: pointer;
    position: absolute;
    bottom: 15px;
    right: 0px;
    left: 67px;
    z-index: 3000;
    display: inline-block;
    width: 200px;
    text-align: center;">风险模型来自于工商总局和税务总局和新浪新闻等</span>
            <div class="chart" ref="chart1"></div>
        </div>
        <div class="pic">
            <div class="title">6大维度</div>

            <div class="pic1" :class="{'picdh':dh,'picdh2':!dh}"></div>
            <div class="pic2">
                <div class="first">欺诈风险
                    <div>欺诈风险：是指项目在不同阶段，由于伪造相关信息和数据给相关利益人而造成的风险；</div>
                </div>
                <div class="second">资产交割风险
                    <div>资产交割风险：是指公司财务结构不合理、融资不当使公司可能丧失偿债能力而导致投资者预期收益下降的风险；</div>
                </div>
                <div class="third">金融风险
                    <div>金融风险：是指在经营过程中，由于决策失误，客观情况变化或其他原因使资金、财产、信誉遭受损失的风险。</div>
                </div>
                <div class="fourth">外部风险
                    <div>外部风险：是指由于外部环境的不确定性带来的风险.</div>
                </div>
                <div class="fifth">资产基因风险
                    <div>资产基因风险：是指项目设计和运维管理等各方面的质量风险；</div>
                </div>
                <div class="sixth">经营风险
                    <div>营运风险：是指在项目不同阶段，管理流程和合规性方面的不确定性带来的风险；</div>
                </div>
            </div>
        </div>
        <div class="chart1" style="margin-left: 20px">
            <div class="title">事件影响指数</div>
            <div class="chart" ref="chart2"></div>
        </div>
        <div class="table">
            <div class="title">风险信息列表 <i class="el-icon-refresh" @click="addrisk" style="font-size: 25px;position: absolute;right: -40px;color: #4e9ffa;cursor: pointer;top: 2px"></i></div>
            <div style="width: 100%;height: 300px;clear: both;margin-top: 65px">
                <VuePerfectScrollbar v-scroll class="main_scroll">
                    <div class="tiao" v-show="addrisks" :class="{'active':chooseactive==12}" @click="startchange(12)">
                        <span style="margin-right: 15px">12</span><span class="hidespan">CEO提出分红机制</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <div class="tiao" v-show="addrisks" :class="{'active':chooseactive==11}" @click="startchange(11)">
                        <span style="margin-right: 15px">11</span><span class="hidespan">市场部签订100亿订单</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(3)"></i>
                    </div>
                    <div class="tiao" v-show="addrisks" :class="{'active':chooseactive==10}" @click="startchange(10)">
                        <span style="margin-right: 15px">10</span><span class="hidespan">公司建立员工激励管理体系</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==9}" @click="startchange(9)">
                        <span style="margin-right: 15px">9</span><span class="hidespan">公司进军区块链行业</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(2)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==8}" @click="startchange(8)">
                        <span style="margin-right: 15px">8</span><span class="hidespan">关于公司股票做市商不足2家的公告</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(2)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==7}" @click="startchange(7)">
                        <span style="margin-right: 15px">7</span><span class="hidespan">关于对公司相关当事人采取自律监管措施</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(2)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==6}" @click="startchange(6)">
                        <span style="margin-right: 15px">6</span><span class="hidespan">关于控股子公司股权转让</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(3)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==5}" @click="startchange(5)">
                        <span style="margin-right: 15px">5</span><span class="hidespan">公司CTO张陈意向入职</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==4}" @click="startchange(4)">
                        <span style="margin-right: 15px">4</span><span class="hidespan">管理层离职或被解雇，将丧失期权激励计划</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==3}" @click="startchange(3)">
                        <span style="margin-right: 15px">3</span><span class="hidespan">2个月内任命新CEO，否则投资方在董事会获得多数席位</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==2}" @click="startchange(2)">
                        <span style="margin-right: 15px">2</span><span class="hidespan">盈利达到2.3亿元，否则大股东以市场溢价20%赎回股份</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(3)"></i>
                    </div>
                    <div class="tiao" :class="{'active':chooseactive==1}" @click="startchange(1)">
                        <span style="margin-right: 15px">1</span><span class="hidespan">年增长率达到30%，否则出售30%股权年增长率达到30%，否则出售30%股权</span><span>2018.09.09 12:22:33</span>
                        <i style="cursor: pointer" class="el-icon-document" @click="openzhengshu(1)"></i>
                    </div>
                    <el-dialog
                        class="certificationDialog"
                        title="提示"
                        :visible.sync="centerDialogVisible"
                        width="753px" center>
                        <Certification :certificationData="certificationData1" v-show="zhengshu==1"/>
                        <Certification :certificationData="certificationData2" v-show="zhengshu==2"/>
                        <Certification :certificationData="certificationData3" v-show="zhengshu==3"/>
                        <Certification :certificationData="certificationData4" v-show="zhengshu==4"/>
                        <Certification :certificationData="certificationData5" v-show="zhengshu==5"/>
                    </el-dialog>
                </VuePerfectScrollbar>
            </div>
        </div>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import Certification from './Certification.vue'

    export default {
        name: '',
        props: ['options'],
        data() {
            return {
                centerDialogVisible: false,
                dh: false,
                startnum: 50,
                startnum2: 50,
                chooseactive: 1,
                timeOut: null,
                timeOut2: null,
                addrisks: false,
                newnum: 9,
                beishu: 10,
                zhengshu: 1,
                certificationData1: {
                    certificationBody: '德勤会计师事务所',
                    certifiMethod: 'JSON信息获取远程合约',
                    infoSources: '普华永道会计师事务所',
                    sourceMethod: 'XML信息获取远程合约'
                },
                certificationData2: {
                    certificationBody: '金杜律师事务所',
                    certifiMethod: 'XML信息获取远程合约',
                    infoSources: '新浪新闻',
                    sourceMethod: 'JSON信息获取远程合约'
                },
                certificationData3: {
                    certifiMethod: 'JSON信息获取远程合约',
                    certificationBody: '工商总局和税务总局',
                    infoSources: '本平台',
                    sourceMethod: 'XML信息获取远程合约'
                },
                certificationData4: {
                    certifiMethod: 'JSON信息获取远程合约',
                    certificationBody: '证券公司和会计所和律所',
                    infoSources: '证券公司',
                    sourceMethod: 'XML信息获取远程合约'
                },
                certificationData5: {
                    certifiMethod: 'JSON信息获取远程合约',
                    certificationBody: '金杜律师事务所',
                    infoSources: '工商总局和税务总局和新浪新闻',
                    sourceMethod: 'XML信息获取远程合约'
                }
            }
        },
        methods: {
            mapChart(a) {
                let myChart, option, angle, curVal;
                myChart = this.$echarts.init(this.$refs.chart1);
                angle = [220, -40];
                option = {
                    backgroundColor: '#fff',
                    tooltip: {
                        show: false,
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    series: [
                        {
                            name: '最外层环仪表盘',
                            type: "gauge",
                            min: 0,
                            max: 100,
                            center: ['50%', '58%'],
                            startAngle: angle[0],
                            endAngle: angle[1],
                            splitNumber: 20,
                            axisLine: {
                                lineStyle: {
                                    color: [
                                        [1, "#c1c3c5"]
                                    ],
                                    width: 10
                                }
                            },
                            axisTick: {
                                lineStyle: {
                                    color: "#fff",
                                    width: 2
                                },
                                length: 0,
                                splitNumber: 1
                            },
                            axisLabel: {
                                distance: -40,
                                formatter: function (v) {
                                    if (v == 60) {
                                        return '{a|' + v + '}';
                                    } else if (v == 85) {
                                        return '{b|' + v + '}';
                                    } else {
                                        return v;
                                    }
                                    ;
                                },
                                textStyle: {
                                    color: "#bbb"
                                },
                                rich: {
                                    a: {
                                        color: '#fbe010'
                                    },
                                    b: {
                                        color: '#3fa7dc'
                                    }
                                }
                            },
                            splitLine: {
                                show: true,
                                length: 10,
                                lineStyle: {
                                    color: '#fff',
                                    width: 2
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#818488",
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowBlur: 10
                                }
                            },
                            detail: {
                                formatter: "{value}分",
                                offsetCenter: [0, "60%"],
                                textStyle: {
                                    fontSize: 30,
                                    color: "#333"
                                }
                            },
                            title: {
                                show: false
                            },
                            pointer: {
                                length: '85%'
                            },
                            data: [{
                                value: a
                            }]
                        },
                        {
                            name: "内环仪表盘四段颜色",
                            type: "gauge",
                            min: 0,
                            max: 100,
                            radius: '69%',
                            center: ['50%', '58%'],
                            startAngle: angle[0],
                            endAngle: angle[1],
                            splitNumber: 10,
                            axisLine: {
                                lineStyle: {
                                    color: [
                                        [0.6, '#fb5310'],
                                        [0.85, '#fbe010'],
                                        [1, "#3fa7dc"]
                                    ],
                                    width: 15
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                length: 15,
                                lineStyle: {
                                    color: '#fff',
                                    width: 2
                                }
                            },
                            pointer: {
                                length: 0
                            },
                            detail: {
                                show: false
                            },
                        }],
                    animationDuration: function (idx) {
                        // 越往后的数据延迟越大
                        return idx * 10000;
                    }
                };
                myChart.setOption(option);
            },
            mapChart1(a) {
                let myChart, option;
                myChart = this.$echarts.init(this.$refs.chart2);
                option = {
                    tooltip: {
                        formatter: "{a}{b} : {c}"
                    },
                    series: [
                        {
                            name: '风险指标',
                            type: 'gauge',
                            center: ['50%', '58%'],
                            detail: {
                                formatter: '{value}',
                                color: '#fb2278'
                            },
                            data: [{value: a, name: ''}],
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 30,
                                    shadowBlur: 0,
                                    color: [
                                        [0.3, '#32d098'],
                                        [0.7, '#7472d3'],
                                        [1, '#fb2278']
                                    ]
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            itemStyle: {
                                color: '#fb2278'
                            },
                        }
                    ]
                };
                myChart.setOption(option);
            },
            startchange(a) {
                this.chooseactive = a;
                if (Math.random() > 0.5) {
                    this.startnum = this.startnum + parseInt(Math.random() * 5 + 5);
                } else {
                    this.startnum = this.startnum - parseInt(Math.random() * 5 + 5);
                }
                this.mapChart1(this.startnum);
                if (!this.dh) {
                    this.dh = false;
                    this.dh = true;
                    this.timeOut = setTimeout(() => {
                        this.dh = false;
                        clearTimeout(this.timeOut);
                    }, 2000);
                }

            },
            addrisk() {
                this.addrisks = true;
                this.newnum = 9;
                this.startnum2 = 0;
                this.mapChart(0);
                this.timeOut2 = setTimeout(() => {
                    this.mapChart(60);
                    clearInterval(this.timeOut2);
                    this.timeOut2 = null
                }, 200);
//                if(!this.timeOut2){
//                    this.timeOut2 = setInterval(() => {
//                        if(this.newnum>0){
//                           this.startnum2 +=5;
//                            this.mapChart( this.startnum2);
//                            this.newnum--
//                        }  else {
//                            clearInterval(this.timeOut2);
//                            this.timeOut2=null
//                        }
//                    }, 500);
//                }


            },
            openzhengshu(id) {
                this.zhengshu = id;
                this.centerDialogVisible = true;
            }
        },
        mounted() {
            this.mapChart(50);
            this.mapChart1(60);
        },
        components: {
            VuePerfectScrollbar,
            Certification
        },

    }
</script>

<style lang="scss" scoped>
    #content {
        float: left;
        height: 370px;
        width: 100%;
        border-radius: 5px;
        /*margin-top: 28px;*/
        margin-left: 10px;
        position: relative;
        .main_scroll {
            width: 100%;
            height: 100%;
        }
        .tiao {
            width: 630px;
            margin: 5px auto 5px;
            height: 36px;
            line-height: 36px;
            padding: 0 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px #eeeeee;
            i {
                position: relative;
                top: -13px;
            }
            span {
                display: inline-block;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:nth-child(1) {
                    width: 16px;
                }
            }
            .el-button {
                margin-left: 5px;
                padding: 0;
                border: none;
            }
        }
        .tiao:hover {
            box-shadow: none;
            border: 1px solid rgb(190, 145, 107);
            height: 34px;
            line-height: 34px;
            cursor: pointer;
            i {
                position: relative;
                top: -12px;
            }
        }
        .tiao.active {
            i {
                position: relative;
                top: -12px;
            }
            box-shadow: none;
            border: 1px solid rgb(190, 145, 107);
            height: 34px;
            line-height: 34px;
            cursor: pointer;
            background: rgba(190, 145, 107, 0.7);
        }
        .hidespan {
            display: inline-block;
            width: 68%;
        }
        > div {
            float: left;
            border-radius: 5px;
            background: white;
            height: 370px;
            position: relative;
            .title {
                padding: 6px 20px;
                position: absolute;
                top: 17px;
                left: 7px;
                background: linear-gradient(to right, #ddc196, #c39368); /* 标准的语法 */
                text-align: center;
                color: white;
                border-radius: 5px;
                z-index: 100;
            }
            .chart {
                width: 320PX;
                height: 370px;
            }
        }
        .chart1 {
            width: 365px;
        }
        .pic {
            width: 410px;
            margin-left: 20px;
            position: relative;
            .pic1 {
                position: absolute;
                z-index: 150;
                width: 410px;
                height: 370px;
                background: url("../assets/img/platform/risk/sic.png") no-repeat center;

                /*transition: all 5s;*/
            }
            .pic1.picdh {
                animation: myfirst 2s;
                animation-timing-function: linear;
                animation-direction: normal;

            }
            .pic1.picdh2 {
                animation: none;
            }
            @keyframes myfirst {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            .pic2 {
                position: absolute;
                z-index: 200;
                width: 100%;
                height: 100%;
                background: url("../assets/img/platform/risk/sixgod.png") no-repeat center;
                div {
                    width: 60px;
                    /*height: 50px;*/
                    padding-top: 50px;
                    position: absolute;
                    font-size: 14px;
                    text-align: center;
                    img {
                        position: absolute;
                        z-index: 300;
                        display: none;
                    }
                    div {
                        width: 317px;
                        height: 100px;
                        padding: 20px;
                        border-radius: 5px;
                        color: white;
                        line-height: 30px;
                        text-indent: 2em;
                        text-align: left;
                        display: none;
                    }
                }
                div:hover {
                    cursor: pointer;
                    div {
                        display: block;
                    }
                }
                .first {
                    top: 300px;
                    left: 178px;
                    background: url("../assets/img/platform/risk/pic1.png") no-repeat top;
                    div {
                        background: rgba(117, 112, 212, .9);
                        top: 58px;
                        left: -152px;
                    }
                }
                .second {
                    width: 120px;
                    top: 221px;
                    left: 29px;
                    background: url("../assets/img/platform/risk/pic2.png") no-repeat top;
                    div {
                        background: rgba(242, 152, 144, .9);
                        top: -56px;
                        left: -361px;
                    }
                }
                .third {
                    top: 91px;
                    left: 59px;
                    background: url("../assets/img/platform/risk/pic3.png") no-repeat top;
                    div {
                        background: rgba(254, 70, 91, .9);
                        top: -100px;
                        left: -372px;
                    }
                }
                .fourth {
                    top: 23px;
                    left: 176px;
                    background: url("../assets/img/platform/risk/pic4.png") no-repeat top;
                    div {
                        background: rgba(139, 82, 186, .9);
                        top: -155px;
                        left: -149px;
                    }
                }
                .fifth {
                    width: 120px;
                    top: 93px;
                    left: 268px;
                    background: url("../assets/img/platform/risk/pic5.png") no-repeat top;
                    div {
                        background: rgba(74, 143, 248, .9);
                        top: -69px;
                        left: 100px;
                    }
                }
                .sixth {
                    top: 221px;
                    left: 298px;
                    background: url("../assets/img/platform/risk/pic6.png") no-repeat top;
                    div {
                        background: rgba(239, 196, 77, .9);
                        left: 70px;
                        top: -60px;
                    }
                }
            }
        }
        .table {
            width: 680px;
            margin-left: 20px;
        }
        .chart2, .chart3, .chart4 {
            margin-top: 20px;
        }
    }
</style>

<style lang="scss">
    #content{
        .certificationDialog{
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
            }
        }
    }
</style>
