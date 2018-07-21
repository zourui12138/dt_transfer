<template>
    <el-dialog id="gif" title="提示" :visible.sync="options.show" :before-close="handleClose">
        <div class="title" style="text-align: center">{{options.name}}—— <span style="color: #e2992e">{{personllist[gifstep].name||''}}</span></div>
        <div class="topbox fl">
            <div class="title">合约代码</div>
            <img src="../assets/img/platform/gif/daima.png" alt="">
        </div>
        <div class="topbox topbox2 fl" style="text-align: center">

            <img src="../assets/img/platform/gif/prev.png" @click="prevfunc" alt="" v-show="scroolshow==true"
                 style="position: absolute;top: 0;right: -35px;width: 33px;height: 33px;opacity: 1">
            <div class="title">{{options.list[gifstep].contract}}</div>
            <img src="../assets/img/platform/gif/13.gif" alt="" style="opacity: 1"  v-show="this.gifstep==0&&this.startlala">
            <img src="../assets/img/platform/gif/success.png" alt=""  :class="{'show':this.successpic}" v-show="this.successpic" style="width: 220px;height: 251px;margin: 0 auto;padding-top: 50px;opacity: 1;animation: none">
            <img src="../assets/img/platform/gif/success.png" alt=""  :class="{'show':this.personllist[this.gifstep].num=='success'&&!this.successpic}"   v-show="this.personllist[this.gifstep].num=='success'&&!this.successpic" style="width: 220px;height: 251px;margin: 0 auto;padding-top: 50px">
            <img src="../assets/img/platform/gif/1.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==1&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==1&&!this.successpic">
            <img src="../assets/img/platform/gif/2.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==2&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==2&&!this.successpic">
            <img src="../assets/img/platform/gif/3.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==3&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==3&&!this.successpic">
            <img src="../assets/img/platform/gif/4.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==4&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==4&&!this.successpic">
            <img src="../assets/img/platform/gif/5.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==5&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==5&&!this.successpic">
            <img src="../assets/img/platform/gif/6.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==6&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==6&&!this.successpic">
            <img src="../assets/img/platform/gif/7.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==7&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==7&&!this.successpic">
            <img src="../assets/img/platform/gif/8.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==8&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==8&&!this.successpic">
            <img src="../assets/img/platform/gif/9.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==9&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==9&&!this.successpic">
            <img src="../assets/img/platform/gif/10.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==10&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==10&&!this.successpic">
            <img src="../assets/img/platform/gif/11.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==11&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==11&&!this.successpic">
            <img src="../assets/img/platform/gif/12.gif" alt=""  :class="{'show':this.personllist[this.gifstep].num==12&&!this.successpic}"  v-show="this.personllist[this.gifstep].num==12&&!this.successpic">

        </div>
        <div class="bottombox fl">
            <div class="row">
                <div>合约描述</div>
            </div>
            <div class="col">
                <p>{{options.describe}}</p>
            </div>
        </div>
        <div class="bottombox bottombox2 fl">
            <img src="../assets/img/platform/gif/next.png" v-show="scroolshow==true" @click="nextfunc" alt="" style="position: absolute;bottom: 0;right: -35px;width: 33px;height: 33px">
            <div class="row">
                <div>执行过程</div>
            </div>
            <div class="col col2">
                <div  v-for="(i,index) in this.list" v-show="msgstep>=parseInt(index)" :class="{'current':msgstep==parseInt(index),'show':msgstep>=parseInt(index)}">{{i}}</div>
            </div>

        </div>
        <div class="buttonbox">
            <button class="buttons" v-show="scroolshow==true" @click="go_path(options.url)">
                确认
            </button>
            <button class="buttons" v-show="scroolshow==false" @click="start">
                确认执行
            </button>
            <button class="buttons" v-show="scroolshow==false" @click="options.show=false">
                取消
            </button>
        </div>

    </el-dialog>

</template>

<script>
    export default {
        name: '',
        props: ['options'],
        data() {
            return {
                gifstep: 0,
                timer: null,
                scroolshow: false,
                list: [],
                timer2: null,
                msgstep: 0,
                successpic:false,
                personllist:[{num:0,name:'等待执行'}],
                startlala:true
            }
        },
        methods: {
            handleClose(done) {
                options.show = false;
                done()
            },
            prevfunc() {
                console.info('aaaaa')
                if (this.gifstep > 0 && this.scroolshow) {
                    this.gifstep = this.gifstep - 1;
                    this.successpic=false;
                    this.list = this.options.list[this.gifstep].list;
                    this.msgstep=this.options.list[this.gifstep].list.length-1
                }

            },
            nextfunc() {
                if (this.gifstep <  this.options.list.length -1 && this.scroolshow) {
                    this.gifstep = this.gifstep + 1;
                    this.list = this.options.list[this.gifstep].list;
                    this.msgstep=this.options.list[this.gifstep].list.length-1
                }else {
                    this.successpic=true;
                }
            },
            go_path(path) {
                if (path) {
                    this.$router.push("/" + path)
                }else {
                    this.options.show=false
                }
            },
            gostart() {
                this.startlala=false
                this.personllist=this.options.list
                this.scroolshow = false;
                this.gifstep=0;
                this.msgstep=0;
                this.list = this.options.list[this.gifstep].list;
                this.timer = null;
                this.timer2 = null;
                this.timer2 = setInterval(() => {
                    this.msgstep += 1;
                    if (this.msgstep >= this.list.length) {
                        clearInterval(this.timer2);
                        this.timer2 = null;
                    }
                }, 1000);
                this.timer = setInterval(() => {
                    console.info(this.gifstep,this.options.list.length - 1)
                    if (this.gifstep >= this.options.list.length - 1) {
                        this.successpic=true;
                        clearInterval(this.timer);
                        this.timer = null;
                        this.scroolshow = true;
                        this.list = this.options.list[this.options.list.length-1].list;

                    } else {
                        this.gifstep += 1;
                        this.msgstep = 0;
                        this.list = this.options.list[this.gifstep].list;
                        this.timer2 = setInterval(() => {
                            console.info(this.msgstep)
                            this.msgstep += 1;
                            if (this.msgstep >= this.list.length) {
                                clearInterval(this.timer2);
                                this.timer2 = null;
                            }

                        }, 1000);
                    }
                }, 4100);
            },
            start(){

                this.gostart();
            }

        },
        mounted() {
        },
        components: {},
        watch: {
            'options.show'() {
                this.gifstep = 0,
                    this.timer = null,
                    this.scroolshow = false,
                    this.list = [],
                    this.timer2 = null,
                    this.msgstep = 0,
                    this.successpic = false,
                    this.personllist = [{num: 0, name: '等待执行'}],
                    this.startlala = true
            }
        }
    }
</script>
<style lang="scss">
    #gif {
        .fl {
            float: left;
            border: 1px solid #c5c2b4;
            margin-bottom: 15px;
        }
        .el-dialog {
            width: 1445px;
            height: 850px;
            margin-top: 80px !important;
            padding: 0;
            .el-dialog__header {
                display: none;
            }
            .el-dialog__body {
                padding: 0;
            }
            .title {
                height: 60px;
                line-height: 60px;
                padding-left: 20px;
                font-size: 20px;
                font-weight: 400;
                border-bottom: 1px solid #cdcdcd;
            }
            .topbox {
                width: 548px;
                height: 400px;
                margin-left: 34px;
                margin-top: 20px;
                .title {
                    height: 35px;
                    line-height: 35px;
                    text-align: center;
                    color: white;
                    font-size: 20px;
                    font-weight: bold;
                    background: #d8be96;
                }
                img {
                    width: 100%;
                    height: 365px;
                    margin: 0 auto;
                }
            }
            .bottombox {
                width: 548px;
                height: 220px;
                margin-left: 34px;
                > div {
                    height: 100%;
                    width: 486px;
                    float: left;
                }
                .row {
                    width: 60px;
                    background: #dabe92;
                    div {
                        padding-top: 66px;
                        width: 20px;
                        margin: 0 auto;
                        color: white;
                        font-size: 20px;
                    }
                }
                .col {
                    padding-top: 20px;
                    p {
                        font-size: 16px;
                        line-height: 26px;
                        padding-left: 15px;
                        width: calc(100% - 18px);
                    }
                    div {
                        margin-left: 20px;
                        margin-bottom: 10px;
                        padding-left: 15px;
                        width: 700px;
                        height: 42px;
                        line-height: 42px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px #eeeeee;
                        overflow: hidden; /*自动隐藏文字*/
                        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
                        white-space: nowrap;/*强制不换行*/

                        &:nth-child(1) {
                            margin-top: -10px;
                        }
                    }
                    div.current {
                        border: 1px solid #c6c3af;
                        background: #f3f0e4;
                    }
                }
                .col2{
                    div.show{
                        animation: myfirst 1s forwards linear;
                    }
                    @keyframes myfirst
                    {
                        0% {opacity: 0;}
                        100% {opacity: 1;}
                    }
                }
            }
            .topbox2 {
                width: 810px;
                height: 400px;
                margin-left: 15px;
                position: relative;
                img{
                    opacity: 0;
                }
                img.show{
                    animation: myfirst 2s forwards linear;
                }
                @keyframes myfirst
                  {
                     0% {opacity: 0;}
                      100% {opacity: 1;}
                  }
            }
            .bottombox2 {
                width: 810px;
                height: 220px;
                margin-left: 15px;
                margin-bottom: 30px;
                position: relative;
            }
            .buttonbox{
                clear: both;
                width: 80%;
                margin: 60px auto;
                text-align: center;
                .buttons {
                   /*margin: 0 20%;*/
                    margin-right: 20px;
                    width: 118px;
                    height: 36px;
                    color: #4b43ff;
                    line-height: 36px;
                    text-align: center;
                    border: 1px solid #5676c4;
                     border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    background: white;
                }
            }

        }

    }
</style>
