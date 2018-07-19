<template>
    <div id="release">
        <header class="title card clear">
            <h1 class="fl">我想转让</h1>
            <el-autocomplete
                class="fl"
                v-model="transferName"
                :fetch-suggestions="querySearch"
                placeholder="请输入基金/股权名称">
                <el-select v-model="transferType" slot="prepend" placeholder="请选择">
                    <el-option label="基金" value="基金"></el-option>
                    <el-option label="股权" value="股权"></el-option>
                </el-select>
            </el-autocomplete>
            <h2 class="fl">转让企元数量：</h2>
            <div class="count fl">
                <el-slider class="fl" :max="500" v-model="count"></el-slider>
                <span class="fl">{{count+'个'}}</span>
            </div>
            <div class="price fl">
                <span class="fl">售价</span>
                <el-input class="fl" v-model="price" placeholder=""></el-input>
                <span class="fl">投元</span>
            </div>
            <div class="proportion fr">
                <h3>系统对该基金投元企业兑换比估值：<strong>1:1.06</strong></h3>
                <h3>最近一个月该基金平均投元企元兑换比：<strong>1:1.06</strong></h3>
            </div>
        </header>
        <section class="section card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="msg">
                        <h1>基金详情</h1>
                        <div class="border_box">
                            <el-row :gutter="20">
                                <el-col :span="12"><p>基金名称：<span>暂行办法实施后成立的基金</span></p></el-col>
                                <el-col :span="12"><p>发布机构：<span>歌斐诺宝（上海）资产管理有限公司</span></p></el-col>
                                <el-col :span="24"><p>投资时间：<span>2018-06-07</span></p></el-col>
                                <el-col :span="8"><p>投资金额：<strong>50w投元</strong></p></el-col>
                                <el-col :span="8"><p>当前价值：<strong>50w企元</strong></p></el-col>
                                <el-col :span="8"><p>当前估值：<strong>50w增元</strong></p></el-col>
                                <el-col :span="24"><p>当前状态：<span>正在运行</span></p></el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart">
                        <h1>基金兑换比值曲线</h1>
                        <div class="border_box" ref="line"></div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="condition">
                        <h2>转让条件</h2>
                        <div class="border_box">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="接受议价"></el-checkbox>
                                <el-checkbox label="允许资深LP购买"></el-checkbox>
                                <el-checkbox label="允许合规LP购买"></el-checkbox>
                                <el-checkbox label="允许VIP LP购买"></el-checkbox>
                                <el-checkbox label="允许资深GP购买"></el-checkbox>
                                <el-checkbox label="允许合规GP购买"></el-checkbox>
                                <el-checkbox label="允许VIP GP购买"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div>
                        <h2>转让备注</h2>
                        <el-input type="textarea" resize="none" :rows="12" placeholder="请输入内容" v-model="comment"></el-input>
                    </div>
                </el-col>
            </el-row>
            <footer><button type="button" class="gradient_blue">发布</button></footer>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Release",
        data() {
            return{
                transferName: '',
                transferType: '股权',
                count: 100,
                price: '',
                checkList: [],
                comment: ''
            }
        },
        methods: {
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "天瞳威视" },
                    { "value": "环葆嘉节能" }
                ];
            },
            lineChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.line);
                // 图表配置项
                let option = {
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
                        top: 50,
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#e05111','#ef950e'],
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
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
            this.lineChart();
        }
    }
</script>

<style lang='scss' scoped>
    #release{
        .title{
            height: 126px;
            line-height: 126px;
            padding-left: 30px;
            margin-bottom: 20px;
            h1{
                margin-right: 10px;
            }
            h2{
                margin-left: 60px;
            }
            .el-autocomplete{
                width: 420px;
            }
            .el-select{
                width: 100px;
            }
            .count{
                margin-top: 43px;
                height: 38px;
                line-height: 38px;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                padding: 0 10px 0 20px;
                .el-slider{
                    width: 300px;
                }
                >span{
                    width: 80px;
                    text-align: center;
                }
            }
            .price{
                margin-left: 60px;
                .el-input{
                    width: 100px;
                    margin: 0 6px;
                }
            }
            .proportion{
                width: 400px;
                height: 100px;
                padding: 13px 20px;
                text-align: center;
                background-color: #fe6f67;
                color: #fff;
                line-height: 50px;
                font-size: 16px;
                strong{
                    font-weight: normal;
                }
            }
        }
        .section{
            padding: 10px 20px;
            h1{
                height: 36px;
                line-height: 36px;
            }
            h2{
                height: 36px;
                line-height: 36px;
                margin-top: 10px;
            }
            .border_box{
                border: 5px solid #e7e7e7;
            }
            .msg{
                .border_box{
                    padding: 20px;
                }
                p{
                    height: 36px;
                    line-height: 36px;
                    strong{
                        font-weight: normal;
                        color: #fe6f67;
                    }
                }
            }
            .chart{
                .border_box{
                    height: 184px;
                }
            }
            .condition{
                .border_box{
                    padding: 30px 35px;
                }
            }
            footer{
                text-align: right;
                height: 100px;
                line-height: 100px;
                button{
                    width: 120px;
                    height: 36px;
                    color: #fff;
                    border-radius: 4px;
                }
            }
        }
    }
</style>

<style lang="scss">
    #release{
        .el-textarea__inner{
            background-color: #e7e7e7;
            &:focus{
                border-color: #e7e7e7;
            }
        }
    }
</style>
