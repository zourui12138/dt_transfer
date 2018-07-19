<template>
    <div id="myTransfer">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部订单" name="all">
                <el-table
                    class="tableList"
                    :data="allTableData"
                    row-class-name="card"
                    :show-header="false"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column width="120">
                        <template slot-scope="scope"><button :class="scope.row.status === '已完成' ? 'gradient_blue' : 'gradient_orange'" type="button">{{scope.row.status === '已完成' ? '已完成' : '未完成'}}</button></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">订单编号：<span>{{scope.row.number}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">基金名称：<span>{{scope.row.name}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">类别：<span>{{scope.row.type}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">意向购买人：<span>{{scope.row.buyer}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">份额：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.count}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">标价：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.priceTag}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">状态：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.status}}</strong></template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="未完成订单" name="unfinished">
                <el-table
                    class="tableList"
                    :data="unfinishedTableData"
                    row-class-name="card"
                    :show-header="false"
                    header-cell-class-name="tableTitle"
                    style="width: 100%">
                    <el-table-column width="120">
                        <template slot-scope="scope"><button :class="scope.row.status === '已完成' ? 'gradient_blue' : 'gradient_orange'" type="button">{{scope.row.status === '已完成' ? '已完成' : '未完成'}}</button></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">订单编号：<span>{{scope.row.number}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">基金名称：<span>{{scope.row.name}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">类别：<span>{{scope.row.type}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">意向购买人：<span>{{scope.row.buyer}}</span></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">份额：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.count}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">标价：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.priceTag}}</strong></template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">状态：<strong :class="scope.row.status === '已完成' ? 'success' : 'fail'">{{scope.row.status}}</strong></template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "MyTransfer",
        data() {
            return{
                activeName: 'all',
                allTableData: [
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '已完成',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '已完成',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    }
                ],
                unfinishedTableData: [
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    },
                    {
                        status: '等待签署保密协议',
                        number: '0t22345666',
                        name: '1234567841',
                        type: '基金',
                        buyer: '张三丰',
                        count: '200W企元',
                        priceTag: '200W企元'
                    }
                ]
            }
        }
    }
</script>

<style lang='scss' scoped>
    #myTransfer{
        .tableList{
            button{
                width: 90px;
                height: 60px;
                color: #fff;
                border-radius: 4px;
            }
            strong{
                font-weight: normal;
                font-size: 16px;
                &.success{
                    color: #475fff;
                }
                &.fail{
                    color: #fe6f67;
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
                background-color: #409EFF;
            }
        }
    }
</style>
