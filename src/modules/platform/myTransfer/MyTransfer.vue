<template>
    <div id="myTransfer">
        <el-tabs v-model="activeName">
            <el-tab-pane label="我卖出的" name="sell">
                <header class="tableNav">
                    <ul class="clear">
                        <li class="fl"><span>全部订单</span></li>
                        <li class="fl"><span>已完成订单</span></li>
                        <li class="fl"><span>未完成订单</span></li>
                        <li class="fl"><el-input placeholder="请输入内容" v-model="searchSell" clearable></el-input></li>
                    </ul>
                </header>
                <el-table
                    class="tableList"
                    :data="sellTableData"
                    row-class-name="card"
                    :show-header="false"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column width="120">
                        <template slot-scope="scope"><button :class="scope.row.status === '已完成' ? 'finish' : 'fail'" type="button">{{scope.row.status === '已完成' ? '已完成' : '未完成'}}</button></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">订单编号：<span>{{scope.row.uuid}}</span></template>
                    </el-table-column>
                    <el-table-column width="400px">
                        <template slot-scope="scope">名称：<span>{{scope.row.productName}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">类别：<span>{{scope.row.productType}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">买方：<span>{{scope.row.sellName}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">份额：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.share}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">标价：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.price}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">状态：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.status}}</strong></template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    @current-change="getSellData"
                    :page-size="sellSize"
                    :total="sellTotal">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="我买到的" name="buy">
                <header class="tableNav">
                    <ul class="clear">
                        <li class="fl"><span>全部订单</span></li>
                        <li class="fl"><span>已完成订单</span></li>
                        <li class="fl"><span>未完成订单</span></li>
                        <li class="fl"><el-input placeholder="请输入内容" v-model="searchBuy" clearable></el-input></li>
                    </ul>
                </header>
                <el-table
                    class="tableList"
                    :data="buyTableData"
                    row-class-name="card"
                    :show-header="false"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column width="120">
                        <template slot-scope="scope"><button :class="scope.row.status === '已完成' ? 'finish' : 'fail'" type="button">{{scope.row.status === '已完成' ? '已完成' : '未完成'}}</button></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">订单编号：<span>{{scope.row.uuid}}</span></template>
                    </el-table-column>
                    <el-table-column width="400px">
                        <template slot-scope="scope">名称：<span>{{scope.row.productName}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">类别：<span>{{scope.row.productType}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">卖方：<span>{{scope.row.sellName}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">份额：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.share}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">标价：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.price}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">状态：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.status}}</strong></template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    @current-change="getBuyData"
                    :page-size="buySize"
                    :total="buyTotal">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getBuyData,getSellData} from '../../../api/getData'

    export default {
        name: "MyTransfer",
        data() {
            return{
                roleId: null,
                activeName: 'sell',
                searchSell: '',
                searchBuy: '',
                sellTableData: [],
                buyTableData: [],
                buyTotal: null,
                buySize: 8,
                sellTotal: null,
                sellSize: 8
            }
        },
        methods: {
            async getBuyData(page) {
                let data = await getBuyData(this.roleId,page,this.buySize);
                this.buyTableData = data.data.data.data;
                this.buyTotal = data.data.data.total;
            },
            async getSellData(page) {
                let data = await getSellData(this.roleId,page,this.sellSize);
                this.sellTableData = data.data.data.data;
                this.sellTotal = data.data.data.total;
            }
        },
        mounted() {
            // 获取roleId
            //this.roleId = sessionStorage.getItem('roleid');
            this.roleId = 3;
            this.getBuyData(1);
            this.getSellData(1);
        }
    }
</script>

<style lang='scss' scoped>
    $color: #5f6ac0;
    #myTransfer{
        .tableNav{
            height: 40px;
            line-height: 40px;
            margin-top: 8px;
            padding-left: 20px;
            ul{
                li{
                    margin-right: 50px;
                    span{
                        cursor: pointer;
                        &:hover,&.current{
                            color: $color;
                        }
                    }
                    .el-input{
                        width: 320px;
                    }
                }
            }
        }
        .tableList{
            button{
                width: 90px;
                height: 60px;
                color: #fff;
                border-radius: 4px;
                &.finish{
                    background-color: $color;
                }
                &.fail{
                    background-color:#fd8238;
                }
            }
            strong{
                font-weight: normal;
                font-size: 16px;
                &.success{
                    color: $color;
                }
                &.fail{
                    color: #fd8238;
                }
            }
        }
    }
</style>

<style lang="scss">
    #myTransfer{
        .el-tabs{
            .el-tabs__header{
                margin-bottom: 0;
                background-color: #eee;
                .el-tabs__item{
                    height: 50px;
                    line-height: 50px;
                    &.is-top:last-child,&.is-bottom:last-child{
                        padding-right: 20px;
                    }
                    &.is-top:nth-child(2), &.is-bottom:nth-child(2){
                        padding-left: 20px;
                    }
                    &.is-active{
                        background-color: #fff;
                        color: #333;
                    }
                    &:hover{
                        color: #333;
                    }
                }
                .el-tabs__nav-wrap::after{
                    background-color: #fe6e67;
                }
                .el-tabs__active-bar{
                    height: 0;
                }
            }
        }
        .el-table{
            background-color: transparent;
            .el-table__body{
                border-spacing: 0 10px;
            }
            td{
                border-bottom: none;
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
            margin-top: 20px;
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
