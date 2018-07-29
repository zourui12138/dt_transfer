<template>
    <div id="contract" class="clear">
        <div class="left card fl">
            <h1>合同内容{{$route.query.status}}</h1>
            <h2 class="clear">
                <span class="fl">合同编号：ZY002</span>
                <span class="fl">合同模板：投资协议</span>
                <strong class="fl">帮助</strong>
                <a href="#" class="fr el-icon-download">下载合同</a>
            </h2>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="合同内容" name="合同内容">
                    <VuePerfectScrollbar v-if="showContractOne" v-scroll class="contractContent"><ContractOne/></VuePerfectScrollbar>
                    <VuePerfectScrollbar v-if="showContractTwo" v-scroll class="contractContent"><ContractTwo/></VuePerfectScrollbar>
                    <VuePerfectScrollbar v-if="showContractThree" v-scroll class="contractContent"><ContractThree/></VuePerfectScrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="right fr">
            <h1>合同关键条款</h1>
            <VuePerfectScrollbar v-if="showContractOne" v-scroll class="keyTerms card">
                <h3>本协议由以下双方于2018年<input placeholder="" v-model="contractOne.month" type="text">月<input placeholder="" v-model="contractOne.day" type="text">日签订：</h3>
                <h4>甲方：<input placeholder="" v-model="contractOne.partyA" type="text"></h4>
                <h4>乙方：<input placeholder="" v-model="contractOne.partyB" type="text"></h4>
                <p>鉴于本协议项下之保密信息的所有权或使用权属于甲方，乙方不享有上述保密信息的所有权、排他独占使用权、再许可使用权或其他权利。</p>
                <p>在履行合作协议及有关合同的过程中，乙方未经甲方书面许可，不得以任何方式为其他目的擅自使用上述保密信息</p>
                <p>在本协议期满终止或解除的情况下（无论任何原因），乙方应将其掌握的上述保密信息载体于30天之内归还甲方</p>
                <p>在双方达成下一步合作协议前，不向任何未经双方认可的第三方透露双方合作意向及进展，不与任何未经双方认可的第三方开展与本次合作相同性质的合作洽谈。</p>
                <p>在双方达成下一步合作协议前，不向任何未经双方认可的第三方透露双方合作意向及进展，不与任何未经双方认可的第三方开展与本次合作相同性质的合作洽谈。</p>
            </VuePerfectScrollbar>
            <VuePerfectScrollbar v-if="showContractTwo" v-scroll class="keyTerms card">
                <h4>甲方：<input placeholder="" v-model="contractTwo.partyA" type="text"></h4>
                <h4>乙方：<input placeholder="" v-model="contractTwo.partyB" type="text"></h4>
                <p>双方同意，标的股权每股价格为人民币<input placeholder="" v-model="contractTwo.price" type="text">元/股，乙方应在双方取得全国中小企业股份转让系统成交确认之日向甲方支付股权转让对价共计人民币<input placeholder="" v-model="contractTwo.total" type="text">元</p>
                <p>甲方应促使并确保目标公司的内部权力机构就同意及批准本协议出具相关决议。</p>
                <p>甲乙双方应根据及全国中小企业股份转让系统的要求，提供本次股权转让涉及的应由甲方、乙方及目标公司提供的相关文件、证明及/或资料，包括但不限于成交确认申报及其涉及的：证券账户号码、证券代码、交易单元代码、证券营业部识别码、买卖方向、申报数量、申报价格、成交约定号等内容。</p>
                <p>除本协议另有规定的以外，如果发生前述的违反本协议的情形，守约方有权书面通知违约方要求其在10个工作日内纠正违约行为，若违约方未能够在10个工作日纠正违约行为的，或者违约行为构成实质性违约、导致守约方无法继续履行本协议及/或不能实现协议之目的，守约方有权单方面解除本协议以及就股份转让事宜签署的任何其他文件。此外，违约方应赔偿守约方因违约方的违约而给守约方直接或间接造成的一切索赔、损失、责任、赔偿、费用及开支。</p>
            </VuePerfectScrollbar>
            <VuePerfectScrollbar v-if="showContractThree" v-scroll class="keyTerms card">
                <h4>甲方：<input placeholder="" v-model="contractThree.partyA" type="text"></h4>
                <h4>乙方：<input placeholder="" v-model="contractThree.partyB" type="text"></h4>
                <p>甲乙双方经共同协商，甲方自愿将持有持有<input placeholder="" v-model="contractThree.input1" type="text">合伙企业（有限合伙）（（以下简称企业）实缴出资<input placeholder="" v-model="contractThree.input2" type="text">万元全部转让给乙方，乙方此次出资为<input placeholder="" v-model="contractThree.input3" type="text">万元（其中认缴出资<input placeholder="" v-model="contractThree.input4" type="text">万元，实缴出资<input placeholder="" v-model="contractThree.input5" type="text">万元）。</p>
            </VuePerfectScrollbar>
            <img src="../../../assets/img/platform/signature.png" alt="">
            <h2><button type="button" @click="showGif">提交</button></h2>
        </div>
        <Gif v-if="showContractOne" :options="gifData"/>
        <Gif v-if="showContractTwo" :options="gifData1"/>
        <Gif v-if="showContractThree" :options="gifData2"/>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    // 保密协议
    import ContractOne from '../../../components/ContractOne'
    // 项目转让
    import ContractTwo from '../../../components/ContractTwo'
    // 基金转让
    import ContractThree from '../../../components/ContractThree'
    import Gif from '../../../components/Gif'
    import {setDetailStep} from '../../../api/getData'

    export default {
        name: "Contract",
        components: {VuePerfectScrollbar,ContractOne,ContractTwo,ContractThree,Gif},
        data() {
            return{
                roleId: null,
                activeName: '合同内容',
                contractOne: {
                    partyA: '湖南刚刚好智能物流有限公司',
                    partyB: '成都锦秀德同投资管理合伙企业',
                    month: '7',
                    day: '21'
                },
                contractTwo: {
                    partyA: '湖南刚刚好智能物流有限公司',
                    partyB: '成都锦秀德同投资管理合伙企业',
                    price: '',
                    total: '200'
                },
                contractThree: {
                    partyA: '湖南刚刚好智能物流有限公司',
                    partyB: '成都锦秀德同投资管理合伙企业',
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '100'
                },
                gifData: {
                    show: false,
                    name: '保密智能合约',
                    url: '',
                    describe:'平台用户在进行沟通前，签署保密条款上链，使沟通双方清楚沟通内容的私密性，后续如果发生纠纷，可以根据保密条款进行维权。',
                    list:[
                        {name:"保密合同合约",contract:'合约方：LP：德同资本',num:4,list:['1、用户身份认证，确认权限','2、签署保密协议; 链上哈希值：XXXXXX','3、执行成功']},
                        {name:"合约执行成功",contract:'合约方：LP：德同资本',num:'success',list:['1、节点完成保密合约共识','2、智能合约执行完毕']},
                    ]
                },
                gifData1: {
                    show: false,
                    name: '股权转让智能合约',
                    url: '',
                    describe:'平台用户在进行沟通前，签署保密条款上链，使沟通双方清楚沟通内容的私密性，后续如果发生纠纷，可以根据保密条款进行维权。',
                    list:[
                        {name:"协议上链",contract:'合约方：LP：德同资本',num:3,list:['1、xx身份认证，确认权限','2、发布项目股权转让详情，记录在链上; 链上哈希值：XXXX']},
                        {name:"投元效验",contract:'合约方：LP：德同资本',num:4,list:['1、1.查询投元账户余额','2、执行成功']},
                        {name:"投元支付",contract:'合约方：LP：德同资本',num:9,list:['1、LP1账户向LP2账户转账xx企元、XX增元；LP2账户企元增加xx，增元增加xx','2、LP1账户企元减少xx，增元减少xx；链上哈希值：XXXXXX','3、LP2账户向LP1账户转账XX投元，LP2账户投元减少XX；','4、执行成功']},
                        {name:"工商变更",contract:'合约方：LP：德同资本',num:7,list:['1、股份工商信息变更; 链上哈希值：XXXXXX','2、执行成功']},
                        {name:"合约执行成功",contract:'合约方：LP：德同资本',num:'success',list:['1、节点完成项目股权转让发布合约共识','2、智能合约执行完毕']},
                    ]
                },
                gifData2: {
                    show: false,
                    name: '转让基金智能合约',
                    url: '',
                    describe:'平台用户在进行沟通前，签署保密条款上链，使沟通双方清楚沟通内容的私密性，后续如果发生纠纷，可以根据保密条款进行维权。',
                    list:[
                        {name:"协议上链",contract:'合约方：LP：德同资本',num:3,list:['1、xx身份认证，确认权限','2、发布基金转让详情，记录在链上; 链上哈希值：XXXX']},
                        {name:"投元效验",contract:'合约方：LP：德同资本',num:4,list:['1、查询投元账户余额','2、执行成功']},
                        {name:"投元支付",contract:'合约方：LP：德同资本',num:9,list:['1、LP1账户向LP2账户转账xx企元、XX增元；LP2账户企元增加xx，增元增加xx','2、LP1账户企元减少xx，增元减少xx；链上哈希值：XXXXXX','3、LP2账户向LP1账户转账XX投元，LP2账户投元减少XX；','4、执行成功']},
                        {name:"合约执行成功",contract:'合约方：LP：德同资本',num:'success',list:['1、节点完成项目增值合约共识','2、智能合约执行完毕']},
                    ]
                }
            }
        },
        computed: {
            showContractOne() {
                let show = false;
                show = parseInt(this.$route.query.status) === 1;
                return show;
            },
            showContractTwo() {
                let show = false;
                show = parseInt(this.$route.query.status) === 3 && this.$route.query.type === 'project';
                return show;
            },
            showContractThree() {
                let show = false;
                show = parseInt(this.$route.query.status) === 3 && this.$route.query.type === 'fund';
                return show;
            }
        },
        methods: {
            async setDetailStep() {
                if(this.$route.query.status === '1'){
                    await setDetailStep(this.$route.query.id,this.roleId,this.$route.query.status,'');
                }else if(this.$route.query.status === '3'){
                    let price;
                    this.$route.query.type === 'fund' && (price = this.contractThree.input5);
                    this.$route.query.type === 'project' && (price = this.contractTwo.total);
                    await setDetailStep(this.$route.query.id,this.roleId,this.$route.query.status,price);
                }
            },
            showGif() {
                this.showContractOne && (this.gifData.show = true);
                this.showContractTwo && (this.gifData1.show = true);
                this.showContractThree && (this.gifData2.show = true);
                this.gifData.url = 'platform/detail?type='+this.$route.query.type+'&id='+this.$route.query.id;
                this.gifData1.url = 'platform/detail?type='+this.$route.query.type+'&id='+this.$route.query.id;
                this.gifData2.url = 'platform/detail?type='+this.$route.query.type+'&id='+this.$route.query.id;
                this.setDetailStep();
            }
        },
        mounted() {
            //this.roleId = sessionStorage.getItem('roleid');
            this.roleId = 3;
        }
    }
</script>

<style lang='scss' scoped>
    $color: #5f6ac0;
    #contract{
        .left{
            width: 1360px;
            padding: 0 20px 20px;
            h1{
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                font-size: 16px;
                color: #000;
                font-weight: 600;
                border-bottom: 1px solid #e6e6e6;
            }
            h2{
                line-height: 50px;
                height: 50px;
                padding-left: 20px;
                color: #999;
                a{
                    margin-top: 18px;
                }
            }
            .contractContent{
                background-color: #fafafa;
                padding: 20px;
                height: 738px;
            }
        }
        .right{
            width: 460px;
            h1{
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                font-size: 16px;
                color: #000;
                font-weight: 600;
            }
            .keyTerms{
                height: 490px;
                padding: 20px;
                margin-bottom: 20px;
                p{
                    line-height: 30px;
                    text-indent: 2em;
                    input{
                        border-bottom: 1px solid #fd8238;
                        width: 30px;
                        text-align: center;
                    }
                }
                h3{
                    height: 30px;
                    line-height: 30px;
                    input{
                        border-bottom: 1px solid #fd8238;
                        width: 50px;
                        text-align: center;
                    }
                }
                h4{
                    height: 30px;
                    line-height: 30px;
                    input{
                        border-bottom: 1px solid #fd8238;
                        width: 300px;
                        padding-left: 10px;
                    }
                }
            }
            h2{
                margin-top: 20px;
                button{
                    height: 40px;
                    width: 460px;
                    border-radius: 4px;
                    background-color: $color;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
</style>
