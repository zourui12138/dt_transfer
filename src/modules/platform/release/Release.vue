<template>
    <div id="release">
        <header class="title card clear">
            <h1 class="fl">我想转让</h1>
            <el-autocomplete
                class="fl"
                v-model="transferName"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                placeholder="请输入基金/股权名称">
                <el-select v-model="transferType" slot="prepend" placeholder="请选择" @change="toggleTransferType">
                    <el-option label="基金" :value="0"></el-option>
                    <el-option label="股权" :value="1"></el-option>
                </el-select>
            </el-autocomplete>
            <h2 class="fl">转让企元数量：</h2>
            <div class="count fl">
                <el-slider class="fl" :max="detailMsg.currentValue ? parseInt(detailMsg.currentValue) : 100" v-model="count"></el-slider>
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
                        <h1>{{transferType === 0 ? '基金详情' : '股权详情'}}</h1>
                        <div class="border_box">
                            <el-row :gutter="20">
                                <el-col :span="12"><p><span>{{transferType === 0 ? '基金名称：' : '股权名称：'}}</span><span>{{detailMsg.productName || ''}}</span></p></el-col>
                                <el-col :span="12"><p>发布机构：<span>{{detailMsg.mechanism || ''}}</span></p></el-col>
                                <el-col :span="24"><p>投资时间：<span>{{detailMsg.investmentTime ? (detailMsg.investmentTime | dateFormat) : ''}}</span></p></el-col>
                                <el-col :span="8"><p>投资金额：<strong>{{(detailMsg. investmentAmount || '')+'投元'}}</strong></p></el-col>
                                <el-col :span="8"><p>当前价值：<strong>{{(parseInt(detailMsg.currentValue) || '')+'企元'}}</strong></p></el-col>
                                <el-col :span="8"><p>当前估值：<strong>{{(parseInt(detailMsg.currentValuation) || '')+'投元'}}</strong></p></el-col>
                                <el-col :span="24"><p>当前状态：<span>{{detailMsg.mechanism ? '正在运行' : ''}}</span></p></el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="chart">
                        <h1>最近交易量</h1>
                        <div class="border_box" ref="line"></div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="condition">
                        <h2>转让条件</h2>
                        <div class="border_box">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="允许合格投资人LP购买"></el-checkbox>
                                <el-checkbox label="允许经验投资人LP购买"></el-checkbox>
                                <el-checkbox label="允许资深投资人LP购买"></el-checkbox>
                                <el-checkbox label="允许认证GP购买"></el-checkbox>
                                <el-checkbox label="允许在管GP购买"></el-checkbox>
                                <el-checkbox label="允许荣誉GP购买"></el-checkbox>
                                <el-checkbox label="允许议价"></el-checkbox>
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
            <footer><button type="button" @click="releaseFundsOrEquity">发布</button></footer>
        </section>
    </div>
</template>

<script>
    import {getFundsOrEquity,getReleaseMsg,releaseFundsOrEquity} from '../../../api/getData'

    export default {
        name: "Release",
        data() {
            return{
                restaurants: [
                    { "value": "天瞳威视" },
                    { "value": "环葆嘉节能" }
                ],
                transferName: '',
                transferType: 0,
                transferId: null,
                detailMsg: {},
                count: 0,
                price: '',
                checkList: [],
                comment: '',
                fundsList: [],
                equityList: [],
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
            lineChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.line);
                // 图表配置项
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['交易量'],
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
                        data: ['07.06','07.07','07.08','07.09','07.10','07.11','07.12','07.13','07.14','07.15','07.16','07.17','07.18','07.19','07.20','07.21']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#fd8238'],
                    series: [
                        {
                            name: '交易量',
                            type: 'bar',
                            data: [11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10, 12, 13],
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
            handleSelect(item) {
                this.transferId = item.productId;
                this.getReleaseMsg(1);
            },
            toggleTransferType(arg) {
                this.transferType = arg;
                this.getFundsOrEquity(1);
            },
            // 获取基金和股权列表-->0为基金，1为股权
            async getFundsOrEquity(id) {
                let data = await getFundsOrEquity(id,this.transferType);
                this.restaurants = [];
                data.data.data.forEach((item) => {
                    this.restaurants.push({value: item.productName,productId: item.productId});
                });
            },
            // 获取基金和股权详情
            async getReleaseMsg(id) {
                let data = await getReleaseMsg(id,this.transferType,this.transferId);
                this.detailMsg = data.data.data;
            },
            // 转让股权和基金
            async releaseFundsOrEquity() {
                let obj = {
                    price: parseInt(this.price),
                    productId: this.transferId,
                    roleId: 1,
                    share: parseInt(this.count),
                    transferConditions: this.checkList.join(','),
                    transferNote : this.comment
                };
                let data = await releaseFundsOrEquity(obj);
                data.data.message === 'success' && this.$router.push({path: '/platform/myTransfer'});
            },
        },
        mounted() {
            this.lineChart();
            // 获取基金
            this.getFundsOrEquity(1);
        }
    }
</script>

<style lang='scss' scoped>
    $color: #5f6ac0;
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
                    background-color: $color;
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
