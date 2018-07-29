<template>
    <div id="transferMsg">
        <div class="nav card">
            <ul class="clear">
                <li class="fl">转让类型：</li>
                <li class="fl" @click="toggleConditions('type','')" :class="type === '' ? 'current' : ''"><span>全部</span></li>
                <li class="fl" @click="toggleConditions('type',i)" :class="type === i ? 'current' : ''" v-for="i in searchConditions.type"><span>{{i}}</span></li>
            </ul>
            <ul class="clear">
                <li class="fl">转让金额：</li>
                <li class="fl" @click="toggleConditions('price','')" :class="price === '' ? 'current' : ''"><span>全部</span></li>
                <li class="fl" @click="toggleConditions('price',i)" :class="price === i ? 'current' : ''" v-for="i in searchConditions.price"><span>{{i}}</span></li>
            </ul>
        </div>
        <div class="tableList">
            <ul class="clear">
                <li class="card fl" v-for="i in allList">
                    <img src="../../../assets/img/platform/tag.png" alt="">
                    <h1>{{i.name}}</h1>
                    <h2>价值<span>{{i.share}}</span>企元</h2>
                    <h2>标价<span>{{i.price}}</span>投元</h2>
                    <h3><button type="button" :class="i.type">了解更多</button></h3>
                    <img v-if="i.type === 'fund'" src="../../../assets/img/platform/fund_icon.png" alt="">
                    <img v-if="i.type === 'project'" src="../../../assets/img/platform/project_icon.png" alt="">
                </li>
            </ul>
            <el-pagination
                class="pagination"
                background
                layout="prev, pager, next"
                @current-change="getAllList"
                :page-size="pageSize"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        getSearchConditions,
        getAllList
    } from '../../../api/getData'

    export default {
        name: "TransferMsg",
        data() {
            return{
                searchConditions: {},
                pageSize: 15,
                total: null,
                price: '',
                type: '',
                allList: [],
            }
        },
        methods: {
            // 获取搜索条件
            async getSearchConditions() {
                let data = await getSearchConditions();
                this.searchConditions = data.data.data;
            },
            // 获取所有列表
            async getAllList(page) {
                let data = await getAllList(page,this.pageSize,this.price,this.type);
                this.allList = data.data.data.content;
                this.total = data.data.data.totalElements;
            },
            // 切换转让条件
            toggleConditions(type,arg) {
                type === 'type' && (this.type = arg);
                type === 'price' && (this.price = arg);
                this.getAllList(1);
            }
        },
        mounted() {
            this.getSearchConditions();
            this.getAllList(1);
        }
    }
</script>

<style lang='scss' scoped>
    $color: #5f6ac0;
    #transferMsg{
        .nav{
            padding: 20px 30px;
            border-top:6px solid $color;
            ul{
                height: 30px;
                line-height: 30px;
                li{
                    span{
                        cursor: pointer;
                        padding: 4px 10px;
                        border-radius: 2px;
                        margin-left: 10px;
                    }
                    &.current{
                        span{
                            background-color: $color;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .tableList{
            padding-top: 20px;
            ul{
                li{
                    position: relative;
                    width: 300px;
                    margin-left: 20px;
                    margin-bottom: 20px;
                    padding: 10px 30px;
                    &:nth-child(5n+1){
                        margin-left: 0;
                    }
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
                }
            }
        }
    }
</style>

<style lang="scss">
    #transferMsg{
        .pagination{
            text-align: right;
            margin-top: 2px;
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
