<template>
    <div id="transferMsg">
        <div class="nav card">
            <ul class="clear">
                <li class="fl">标的类型：</li>
                <li class="fl" @click="toggleConditions('type','')" :class="type === '' ? 'current' : ''"><span>全部</span></li>
                <li class="fl" @click="toggleConditions('type',i)" :class="type === i ? 'current' : ''" v-for="i in searchConditions.type"><span>{{i}}</span></li>
            </ul>
            <ul class="clear">
                <li class="fl">转让类型：</li>
                <li class="fl" @click="toggleConditions('type','')" :class="type === '' ? 'current' : ''"><span>全部</span></li>
                <li class="fl"><span>买入</span></li>
                <li class="fl"><span>卖出</span></li>
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
                    <img v-if="i.isSell === 1" src="../../../assets/img/platform/sell.png" alt="">
                    <img v-if="i.isSell !== 1" src="../../../assets/img/platform/buy.png" alt="">
                    <h1>{{i.name}}</h1>
                    <h2><strong>{{i.type === 'project' ? '股权比例' : '出让份额(万)'}}</strong><span>{{i.share+(i.type === 'project' ? '%' : '')}}</span></h2>
                    <h2>要价(万)<span>{{i.price}}</span></h2>
                    <h3>
                        <button v-if="i.isSell === 1" type="button" :class="i.type" @click="toDetail(i.type,i.id)">了解更多</button>
                        <button v-if="i.isSell !== 1" type="button" :class="i.type" @click="openDialog('123')">洽谈</button>
                    </h3>
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
        <el-dialog
            class="chatDialog"
            :show-close="true"
            :close-on-press-escape="false"
            :append-to-body="false"
            @close="closeDialog"
            :visible.sync="chatDialog">
            <div class="chat clear">
                <div class="chatBox fl">
                    <div class="clear">
                        <div class="message fl">
                            <header>
                                <img src="../../../assets/img/platform/chat/receiver.png" alt="">
                                <span>{{dialogName}}</span>
                            </header>
                            <VuePerfectScrollbar class="chatRecord" v-scroll>
                                <ul>
                                    <li class="clear" v-for="i in chatRecord">
                                        <img :class="i.isSelf ? 'fr' : 'fl'" src="../../../assets/img/platform/chat/sender.png" alt="">
                                        <div :class="i.isSelf ? 'fr' : 'fl'">
                                            <p>{{i.value}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </VuePerfectScrollbar>
                        </div>
                        <div class="video fl">
                            <header>{{'正在和'+ dialogName +'视频中···'}}</header>
                            <!--<section><img src="../../../assets/img/platform/chat/video.png" alt=""></section>-->
                            <section><video src="../../../assets/video/video.mp4" autoplay loop></video></section>
                            <!--<footer><img src="../../../assets/img/platform/chat/my_video.png" alt=""></footer>-->
                        </div>
                    </div>
                    <div class="send">
                        <ul class="icon clear">
                            <li class="fl"><img src="../../../assets/img/platform/chat/A.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/face.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/shear.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/icon.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/file.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/video_.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/voice.png" alt=""></li>
                            <li class="fl"><img src="../../../assets/img/platform/chat/setting.png" alt=""></li>
                        </ul>
                        <section><el-input type="textarea" :rows="7" resize="none" placeholder="请输入内容" v-model="sendData"></el-input></section>
                        <footer><button type="button" @click="addChatRecord">发送</button></footer>
                    </div>
                </div>
                <div class="blockChain fr">
                    <header>沟通记录上链</header>
                    <section>
                        <ul>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                            <li>
                                <h1>语音记录</h1>
                                <p>2017-07-07 23:59:59</p>
                                <p>哈希值：asdfaddgeg···</p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {
        getSearchConditions,
        getAllList
    } from '../../../api/getData'

    export default {
        name: "TransferMsg",
        components: {VuePerfectScrollbar},
        data() {
            return{
                searchConditions: {},
                pageSize: 15,
                total: null,
                price: '',
                type: '',
                allList: [],
                sendData: '我对您公司的产品非常感兴趣!!',
                dialogName: '',
                chatDialog: false,
                chatRecord: [
                    {
                        isSelf: true,
                        value: '您好，想了解下您的基金情况，不知道能否抽空给我讲解下您的基金具体是干什么的，贵公司主要投资哪方面的基金，方便的话，我们还可以线下洽谈一下！'
                    },
                    {
                        isSelf: false,
                        value: '您好！'
                    },
                    {
                        isSelf: false,
                        value: '本基金主要是投资一些金融贷款项目'
                    },
                    {
                        isSelf: false,
                        value: '我先给您简单介绍一下公司情况吧'
                    }
                ]
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
                this.allList.push({
                    enterpriseAssets: 2000,
                    id: 10,
                    name: "基岩资本东方价值11号",
                    price: 30000,
                    share: 22400,
                    type: "fund",
                });
            },
            // 切换转让条件
            toggleConditions(type,arg) {
                type === 'type' && (this.type = arg);
                type === 'price' && (this.price = arg);
                this.getAllList(1);
            },
            // 进入详情页面
            toDetail(type,id) {
                this.$router.push({path: '/platform/detail',query: {type: type,id:id}});
            },
            // 打开洽谈窗口
            openDialog(name) {
                this.chatDialog = true;
                this.dialogName = name;
            },
            // 关闭洽谈窗口
            closeDialog() {},
            // 洽谈窗口发送信息
            addChatRecord() {
                this.chatRecord.push({
                    isSelf: true,
                    value: this.sendData
                });
                this.sendData = '';
            },
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
                }
            }
        }
        .chatDialog{
            .tradeBox{
                width: 1248px;
                height: 94px;
                line-height: 94px;
                padding: 0 20px;
                margin-bottom: 20px;
                .el-input{
                    width: 320px;
                }
                img{
                    margin: 35px 40px 35px 20px;
                }
                p{
                    height: 94px;
                    strong{
                        font-size: 24px;
                        color: #fe6f67;
                        font-weight: normal;
                        margin: 0 10px;
                    }
                }
                button{
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 4px;
                    text-align: center;
                    color: #fff;
                    background: linear-gradient(to right, #0bcefe,#475dff);
                    margin-top: 27px;
                }
            }
            .chat{
                width: 1288px;
                height: 728px;
                .chatBox{
                    border: 2px solid #e9eaeb;
                    .message{
                        width: 670px;
                        height: 460px;
                        border-right: 2px solid #e9eaeb;
                        header{
                            padding: 0 10px;
                            height: 60px;
                            line-height: 60px;
                            border-bottom: 2px solid #e9eaeb;
                            font-size: 18px;
                            img{
                                margin-top: 5px;
                                margin-right: 10px;
                            }
                        }
                        .chatRecord{
                            margin: 10px;
                            overflow: hidden;
                            height: 378px;
                            ul{
                                li{
                                    div{
                                        max-width: 400px;
                                        margin: 0 20px;
                                        p{
                                            background-color: #eee;
                                            padding: 10px;
                                            line-height: 30px;
                                            border-radius: 10px;
                                        }
                                    }
                                    &:not(:last-child){
                                        margin-bottom: 10px;
                                    }
                                }
                            }
                        }
                    }
                    .video{
                        width: 456px;
                        height: 460px;
                        position: relative;
                        header{
                            padding: 0 10px;
                            height: 60px;
                            line-height: 60px;
                            border-bottom: 2px solid #e9eaeb;
                            font-size: 18px;
                        }
                        section{
                            width: 456px;
                            height: 398px;
                            video{
                                width: 456px;
                                height: 398px;
                                transform: rotate(-90deg);
                            }
                            img{
                                width: 456px;
                                height: 398px;
                            }
                        }
                        footer{
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                            width: 130px;
                            height: 130px;
                            border-radius: 6px;
                            overflow: hidden;
                        }
                    }
                    .send{
                        border-top: 2px solid #e9eaeb;
                        height: 262px;
                        ul{
                            height: 50px;
                            line-height: 50px;
                            li{
                                width: 50px;
                                text-align: center;
                                img{
                                    vertical-align: middle;
                                    cursor: pointer;
                                }
                            }
                        }
                        section{
                            height: 162px;
                            padding: 0 10px;
                            line-height: 30px;
                        }
                        footer{
                            text-align: right;
                            height: 50px;
                            line-height: 50px;
                            padding: 0 10px;
                            button{
                                width: 120px;
                                height: 36px;
                                line-height: 36px;
                                border-radius: 4px;
                                text-align: center;
                                color: #fff;
                                background: linear-gradient(to right, #0bcefe,#475dff);
                                cursor: pointer;
                            }
                        }
                    }
                }
                .blockChain{
                    width: 154px;
                    border: 2px solid #e9eaeb;
                    border-left: none;
                    height: 724px;
                    background: url('../../../assets/img/platform/chat/chain.png') no-repeat 10px 15px;
                    header{
                        height: 62px;
                        line-height: 62px;
                        text-align: center;
                        font-size: 18px;
                    }
                    section{
                        color: #fff;
                        height: 642px;
                        overflow: hidden;
                        margin: 10px 0;
                        ul{
                            width: 140px;
                            margin: auto;
                            li{
                                background: linear-gradient(to right, #ddc196,#c39469);
                                padding: 3px 0 4px 10px;
                                border-radius: 6px;
                                h1{
                                    font-size: 14px;
                                    height: 24px;
                                    line-height: 24px;
                                }
                                p{
                                    font-size: 12px;
                                    line-height: 16px;
                                }
                                &:not(:last-child){
                                    margin-bottom: 18px;
                                }
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
        .chatDialog{
            .el-dialog{
                margin-top: 100px!important;
                margin-bottom: 20px;
                width: 1288px;
                .el-dialog__header{
                    background-color: #fff;
                    height: 10px;
                }
                .el-dialog__body{
                    padding: 0;
                }
            }
        }
    }
</style>
