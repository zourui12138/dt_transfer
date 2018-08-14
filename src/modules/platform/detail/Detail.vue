<template>
    <div id="detail">
        <div class="detailMsg clear">
            <div class="left fl card">
                <div class="left_left fl">
                    <h1>
                        <button type="button">{{$route.query.type === 'fund' ? '基金' : '项目'}}</button>
                        <span>{{detailData.name}}</span>
                    </h1>
                    <h2>
                        <span>{{$route.query.type === 'fund' ? '转让份额：' : '转让股权比例：'}}<strong v-if="$route.query.type === 'fund'">{{detailData.share | initNum}}</strong><strong v-if="$route.query.type === 'project'">{{detailData.share}}</strong>{{$route.query.type === 'project' ? '%' : '份'}}</span>
                        <span>企元价值：<strong>{{detailData.enterpriseAssets | initNum}}</strong>万企元</span>
                        <span>增元价值：<strong>{{detailData.addAssets | initNum}}</strong>万增元</span>
                        <span>要价：<strong>{{detailData.price | initNum}}</strong>万投元</span>
                    </h2>
                    <h3 class="clear">
                        <span class="fl">转让条件：</span>
                        <strong class="fl">{{detailData.transferConditions}}</strong>
                    </h3>
                    <h3 class="clear">
                        <span class="fl">备注：</span>
                        <strong class="fl">{{detailData.transferNote}}</strong>
                    </h3>
                </div>
                <div class="left_right fr">
                    <h1>
                        <span>更新时间<strong>{{detailData.createTime | dateFormat}}</strong></span>
                        <span>运作状态<strong>正在运作</strong></span>
                        <span>浏览数<strong>333</strong></span>
                    </h1>
                    <div>
                        <router-link v-if="$route.query.type === 'project'" :to="'/dist/LPMproject?type=transfer&productId='+detailData.id"><img src="../../../assets/img/platform/project_detail_icon.png" alt=""></router-link>
                        <router-link v-if="$route.query.type === 'fund'" :to="'/dist/LPMfund?type=transfer&productId='+detailData.id"><img src="../../../assets/img/platform/fund_detail_icon.png" alt=""></router-link>
                    </div>
                </div>
            </div>
            <div class="right fr card">
                <h1><span>卖家身份信息</span><img src="../../../assets/img/platform/card.png" alt=""></h1>
                <div class="clear">
                    <img class="fl" src="../../../assets/img/platform/portrait.png" alt="">
                    <div class="fl">
                        <h2>{{detailData.sellerName}}</h2>
                        <h3>投资时间：<span>{{detailData.createTime | dateFormat}}</span></h3>
                        <h3>持有份额：<span v-if="$route.query.type === 'fund'">{{detailData.totalShare | initNum}}</span><span v-if="$route.query.type === 'project'">{{detailData.totalShare}}</span>{{$route.query.type === 'project' ? '%' : '份'}}</h3>
                        <h4><button type="button">联系我</button></h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="tradeSteps card">
            <el-steps :active="step" align-center>
                <el-step></el-step>
                <el-step></el-step>
                <el-step></el-step>
            </el-steps>
            <div class="stepBtn" :class="step < 1 ? 'wait' : 'finish'" @click="toSecretContract()">
                <span>签署保密协议</span>
                <strong></strong>
            </div>
            <div class="stepBtn" :class="step < 2 ? 'wait' : 'finish'" @click="openDialog('博时资本管理有限公司')">
                <span>约谈</span>
                <strong></strong>
            </div>
            <div class="stepBtn" :class="step < 3 ? 'wait' : 'finish'" @click="toSignContract()">
                <span>签署正式合同</span>
                <strong></strong>
            </div>
        </div>
        <div class="detailTabs clear">
            <div class="left card fl">
                <el-tabs v-if="$route.query.type === 'fund'" v-model="activeFunds">
                    <el-tab-pane label="基金介绍" name="基金介绍">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_one">
                                <div v-html="detailData.fundIntroduction"></div>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="基金业绩" name="基金业绩">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_six">
                                <div class="tabs_seven">
                                    <div class="clear">
                                        <div class="chart_line fl" ref="line_one"></div>
                                        <div class="chart_line fl" ref="line_two"></div>
                                    </div>
                                    <!--<div class="chart_bar" ref="bar_three"></div>-->
                                </div>
                                <el-table
                                    :data="projectList"
                                    style="width: 100%">
                                    <el-table-column width="120px" prop="time" label="时间"></el-table-column>
                                    <el-table-column prop="name" label="项目名称"></el-table-column>
                                    <el-table-column width="250px" prop="company" label="企业名称"></el-table-column>
                                    <el-table-column prop="total" label="投资金额(万)"></el-table-column>
                                    <el-table-column prop="current" label="当前价值(万)"></el-table-column>
                                    <el-table-column prop="credit" label="当前信誉(万)"></el-table-column>
                                </el-table>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="信息披露情况" name="信息披露情况">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_eight">
                                <el-row :gutter="30">
                                    <el-col v-for="(i,index) in disclosure" :key="index" :span="6">
                                        <div class="tabs_eight_box clear" :class="i.disabled ? 'disabled' : ''" @click="openOverviewDialog(i.disabled,i.name)">
                                            <div class="fl">
                                                <h1>{{i.name}}</h1>
                                                <h1>{{i.time}}</h1>
                                            </div>
                                            <img class="fr" src="../../../assets/img/platform/doc.png" alt="">
                                        </div>
                                    </el-col>
                                </el-row>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="产品答疑" name="产品答疑">
                        <div class="left_box">
                            <div class="tabs_two">
                                <h1>常见问题</h1>
                                <div>
                                    <h2>1. 问 : 我想了解更多关于项目的介绍？</h2>
                                    <p>答 : 将会在2018年7月9日（下周一）下午3:30举行路演，届时执行董事，投资总监邱晓睿会向投资者详细介绍项目，在线解答投资者问题。敬请关注。</p>
                                    <h2>2. 问 : 这个基金是只投资这四个产品吗？</h2>
                                    <p>答 : 是的。在更早的融资轮次（A轮，Pre-B轮），对这四个拟投项目都有以自有资金的投资。</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-tabs v-if="$route.query.type === 'project'" v-model="activeEquity">
                    <el-tab-pane label="项目概述" name="项目概述">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_one_project" v-scroll>
                                <div v-html="detailData.groupInfo+detailData.productInfo+detailData.projectDesc"></div>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="项目亮点" name="项目亮点">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_two_project">
                                <div v-html="detailData.brightSpot"></div>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="经营概况" name="经营概况">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_three_project" v-scroll>
                                <img src="../../../assets/img/platform/reports.png" alt="">
                                <p>中华人民共和国成立以后，“紫金锭”被载入了每届《中国药典》。</p>
                                <p>为拓展和重现“紫金锭”威力，我公司科研组历经多年反复研究和临床实验，不但栽培成功“紫金锭”所需药材，并总结出了一套行之有效的科学的治癌方 案，开创了“紫金锭”治癌的新篇章（下称：新“紫金锭”）。多年来，我公司科研组免费在全国各地医治了数百名被各大医院判了死刑的晚期癌症患者和各种 疑难病患者，取得了癌症治疗有效率达90%以上，治愈率达50%以上的可喜效果。被新“紫金锭”治愈的癌症患者大多数健在至今，无一例复发。这些被挽救的 鲜活的生命有力地证明了新“紫金锭”的强大功能，打破了“癌症无药医”的神话，也为进一步拓展“紫金锭”的用途奠定了基础。</p>
                                <p>一、新“紫金锭”可治疗各种癌症，总有效率达到90%以上。</p>
                                <p>1、新“紫金锭”可拯救被各大医院放弃治疗、回家等死的各种晚期癌症患者，治愈率达50%以上。</p>
                                <p>2、新“紫金锭”可替代西医“放疗”、“化疗”等。需动手术的癌症患者，可在手术前3-5天开始口服一定量的新“紫金锭”，术后继续服用1-2个月，可杀死手术过程中转移或手术前已经转移或扩散的癌细胞 ，完全可以替代“放疗”、“化疗”等，减轻病人痛苦，可为家庭、国家节约大量的经济支出。可确保癌症永不复发，患者健康长寿，治愈率可达60%以上。</p>
                                <p>3、新“紫金锭”对早期癌症治愈率达到70%以上。癌肿瘤在3公分以下患者，可以不住医院、不动手术，只需在家口服新“紫金锭”。1个月内，肿瘤会缩小或化解，通过咳、呕吐、排泄等方式将癌毒、癌瘤 碎块排出体外。再继续服用1-2个月，可杀死全部癌细胞，一生不会再患癌症，治愈率达70%以上。</p>
                                <p>4、新“紫金锭”治愈率最高的是皮肤癌、食管癌、胃癌、肝癌（早中期）、结肠癌、直肠癌、肛门癌、乳腺、淋巴癌等癌症。这是因为新“紫金锭”可从 两个渠道攻杀癌细胞和化解肿瘤：一是紫金锭从外部贴附肿瘤表面，二是新“紫金锭”在小肠被吸收后随血液进入肿瘤内部，具有内外夹攻的双重功效。</p>
                                <p>二、新“紫金锭”具有强大的止痛功能，可止住晚期癌症患者发生的剧烈疼痛；还可为因疼痛吸吗啡、鸦片等形成的毒瘾戒毒，大幅降低医疗费用。</p>
                                <p>三、新“紫金锭”具有高强的退烧功能，可将晚期癌症患者发生的持续高热在24小时内降为正常体温，继续服药不会再发生高热，大大减轻患者的痛苦。</p>
                                <p>四、新“紫金锭”具有高效的止血功能，可止住白血病人内脏和皮下出血，抢救他们的生命；可为肺、肝、胃、肠等癌症患者形成的胸腔、腹腔积液排液， 恢复原状，不再形成积液。</p>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="项目附件" name="项目附件">
                        <div class="left_box">
                            <VuePerfectScrollbar class="tabs_four_project" v-scroll>
                                <ul>
                                    <li class="clear">
                                        <span class="fl">商业计划书一</span>
                                        <button class="fr" type="button">立即下载</button>
                                        <span class="fr">更新时间：2018-06-01</span>
                                    </li>
                                </ul>
                            </VuePerfectScrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="历史估值" name="历史估值">
                        <div class="left_box">
                            <div class="tabs_five_project">
                                <div class="clear">
                                    <div class="chart_line fl" ref="line_one"></div>
                                    <div class="chart_line fl" ref="line_two"></div>
                                </div>
                                <div class="chart_bar" ref="bar_three"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="right card fr">
                <h1>链上信息</h1>
                <div class="right_step">
                    <el-steps :active="4" align-center>
                        <el-step title="线上洽谈" description="2018.05.09"></el-step>
                        <el-step title="签订合同" description="2018.05.09"></el-step>
                        <el-step title="银行转账" description="2018.05.09"></el-step>
                        <el-step title="交易成功" description="2018.05.09"></el-step>
                    </el-steps>
                    <el-steps :active="5" align-center>
                        <el-step title="线上洽谈" description="2018.05.09"></el-step>
                        <el-step title="线下洽谈" description="2018.05.09"></el-step>
                        <el-step title="签订合同" description="2018.05.09"></el-step>
                        <el-step title="银行转账" description="2018.05.09"></el-step>
                        <el-step title="交易成功" description="2018.05.09"></el-step>
                    </el-steps>
                    <div class="btn">
                        <span>交易</span>
                        <strong></strong>
                    </div>
                    <div class="btn">
                        <span>交易</span>
                        <strong></strong>
                    </div>
                    <img src="../../../assets/img/platform/smartContract.png" alt="">
                    <img src="../../../assets/img/platform/smartContract.png" alt="">
                    <img src="../../../assets/img/platform/smartContract.png" alt="">
                    <img src="../../../assets/img/platform/smartContract.png" alt="">
                </div>
                <div class="right_blockChain">
                    <h2>交易信息<span>2018.08.01 12:22:22</span></h2>
                    <div class="right_blockChain_msg">
                        <h3>哈希值：f224421398f0e74a0c0109057053d8123c38cd95c366170</h3>
                        <el-row>
                            <el-col :span="12"><p>业务类型：增值</p></el-col>
                            <el-col :span="12"><p>增值类型：融资</p></el-col>
                            <el-col :span="12"><p>交易发起方：张大军</p></el-col>
                            <el-col :span="12"><p>交易接收方：红杉资本</p></el-col>
                            <el-col :span="12"><p>库存编码：2017021111</p></el-col>
                            <el-col :span="12"><p>交易时间：2017-05-08 15:22</p></el-col>
                        </el-row>
                        <h3>共识信息</h3>
                        <ul class="clear">
                            <li class="fl">共识确认节点</li>
                            <li class="fl">共识确认时间</li>
                            <li class="fl">共识确认状态</li>
                        </ul>
                        <ul class="clear">
                            <li class="fl">节点1</li>
                            <li class="fl">2017-05-18 14:30</li>
                            <li class="fl">已确认</li>
                        </ul>
                        <ul class="clear">
                            <li class="fl">节点2</li>
                            <li class="fl">2017-05-18 14:30</li>
                            <li class="fl">已确认</li>
                        </ul>
                    </div>
                </div>
            </div>
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
                            <section><video src="../../../assets/video/video.mp4" autoplay loop></video></section>
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
        <el-dialog
            title="预览"
            class="overviewDialog"
            :visible.sync="overviewDialogVisible">
            <VuePerfectScrollbar class="overviewDialogBox">
                <img :src="overviewImg" alt="">
            </VuePerfectScrollbar>
        </el-dialog>
    </div>
</template>

<script>
    import baomixieyi from '../../../assets/img/platform/baomixieyi.jpg'
    import tuoguan from '../../../assets/img/platform/tuoguan.png'
    import youxianhehuo from '../../../assets/img/platform/youxianhehuo.png'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {
        getDetailData,
        getDetailStep,
        setDetailStep
    } from '../../../api/getData'

    export default {
        name: "Detail",
        components: {VuePerfectScrollbar},
        data() {
            return{
                roleId: null,
                detailData: {},
                step: 0,
                activeFunds: '基金介绍',
                activeEquity: '项目概述',
                shareholder: [
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    },
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    },
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    },
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    },
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    },
                    {
                        time: '2017.03.30',
                        name: '张三',
                        type: '个人',
                        total: '50W投元',
                        current: '65W投元',
                        credit: '14W增元'
                    }
                ],
                projectList: [
                    {
                        time: '2018.01.30',
                        name: '小奥互动',
                        company: '北京小奥互动科技股份有限公司',
                        total: 50,
                        current: 65,
                        credit: 14
                    },
                    {
                        time: '2018.03.25',
                        name: '叠境数字',
                        company: '叠境数字科技（上海）有限公司',
                        total: 50,
                        current: 65,
                        credit: 14
                    },
                    {
                        time: '2018.06.20',
                        name: '核桃网络（walnut）',
                        company: '成都核桃网络有限公司',
                        total: 50,
                        current: 65,
                        credit: 14
                    }
                ],
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
                ],
                disclosure: [
                    {
                        name: '保密协议',
                        time: '2018-06-01',
                        disabled: false
                    },
                    {
                        name: '托管合约',
                        time: '2018-06-05',
                        disabled: false
                    },
                    {
                        name: '合伙协议',
                        time: '2018-06-10',
                        disabled: false
                    },
                    {
                        name: '2018年3月月报',
                        time: '2018-03-30',
                        disabled: true
                    },
                    {
                        name: '2018年4月月报',
                        time: '2018-04-30',
                        disabled: true
                    },
                    {
                        name: '2018年5月月报',
                        time: '2018-05-30',
                        disabled: true
                    },
                    {
                        name: '沟通记录',
                        time: '2018-05-20',
                        disabled: true
                    },
                    {
                        name: '会议记录',
                        time: '2018-05-20',
                        disabled: true
                    }
                ],
                overviewDialogVisible: false,
                overviewImg: baomixieyi
            }
        },
        methods: {
            lineOnwChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.line_one);
                // 图表配置项
                let option = {
                    title: {
                        text: '企元趋势图',
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        },
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['企元'],
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
                        boundaryGap: false,
                        data: ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#0acffe'],
                    series: [
                        {
                            name: '企元',
                            type: 'line',
                            data: [500, 850, 1000, 1100, 1400, 1300, 900],
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
            lineTwoChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.line_two);
                // 图表配置项
                let option = {
                    title: {
                        text: '增元趋势图',
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        },
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['增元'],
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
                        boundaryGap: false,
                        data: ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#475dff'],
                    series: [
                        {
                            name: '增元',
                            type: 'line',
                            data: [1100, 1100, 1500, 1300, 1200, 1300, 1000],
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
            barThreeChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.bar_three);
                // 图表配置项
                let option = {
                    title: {
                        text: '股权交易量趋势图',
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        },
                        top: 10,
                        left: 10
                    },
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
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: [
                            '2017.06.05','2017.06.06','2017.06.07','2017.06.08','2017.06.09',
                            '2017.06.10','2017.06.11','2017.06.12','2017.06.13','2017.06.14'
                        ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    color: ['#475dff'],
                    series: [
                        {
                            name: '成交总数量',
                            type: 'bar',
                            barWidth: 30,
                            data: [1000, 4000, 2000, 800, 3000, 2000, 700, 4000, 2000, 800],
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
            // 保密协议
            toSecretContract() {
                this.step === 0 && (this.$router.push({
                    path: '/platform/contract',
                    query: {
                        id: this.$route.query.id,
                        type:this.$route.query.type,
                        status: 1
                    }
                }));
            },
            // 签署正式合同
            toSignContract() {
                this.step === 2 && (this.$router.push({
                    path: '/platform/contract',
                    query: {
                        id: this.$route.query.id,
                        type:this.$route.query.type,
                        status: 3
                    }
                }));
            },
            // 打开洽谈窗口
            openDialog(name) {
                if(this.step === 1){
                    this.chatDialog = true;
                    this.dialogName = name;
                }
            },
            // 关闭洽谈窗口
            closeDialog() {
                this.getDetailStep(1);
            },
            // 洽谈窗口发送信息
            addChatRecord() {
                this.chatRecord.push({
                    isSelf: true,
                    value: this.sendData
                });
                this.sendData = '';
                this.setDetailStep();
            },
            // 获取信息
            async getDetailData() {
                let data = await getDetailData(this.$route.query.id);
                this.detailData = data.data.data;
            },
            // 获取step
            async getDetailStep() {
                let data = await getDetailStep(this.$route.query.id,this.roleId);
                this.step = data.data.data.status;
            },
            // 修改状态
            async setDetailStep() {
                await setDetailStep(this.$route.query.id,this.roleId,2,'');
                this.getDetailStep();
            },
            // 打开预览弹框
            openOverviewDialog(disabled,name) {
                if(!disabled){
                    this.overviewDialogVisible = true;
                    name === '保密协议' && (this.overviewImg = baomixieyi);
                    name === '托管合约' && (this.overviewImg = tuoguan);
                    name === '合伙协议' && (this.overviewImg = youxianhehuo);
                }
            }
        },
        mounted() {
            this.lineOnwChart();
            this.lineTwoChart();
            //this.barThreeChart();
            // 获取roleId
            this.roleId = sessionStorage.getItem('roleid');
            //this.roleId = 3;
            this.getDetailData();
            this.getDetailStep();
        }
    }
</script>

<style lang='scss' scoped>
    #detail{
        .detailMsg{
            .left{
                padding: 20px 40px;
                height: 240px;
                width: 1320px;
                .left_left{
                    width: 800px;
                    h1{
                        height: 50px;
                        line-height: 50px;
                        font-size: 20px;
                        button{
                            width: 70px;
                            height: 30px;
                            border-radius: 4px;
                            color: #fff;
                            margin-right: 20px;
                            background-color: #0acffe;
                        }
                    }
                    h2{
                        height: 50px;
                        line-height: 50px;
                        strong{
                            font-size: 18px;
                            color: #ff0000;
                            margin: 0 10px;
                        }
                        span{
                            &:not(:last-child){
                                margin-right: 30px;
                            }
                        }
                    }
                    h3{
                        line-height: 30px;
                        span{
                            width: 70px;
                        }
                        strong{
                            width: calc(100% - 70px);
                            font-weight: normal;
                        }
                    }
                }
                .left_right{
                    h1{
                        height: 50px;
                        line-height: 50px;
                        color: #999;
                        span{
                            strong{
                                font-weight: normal;
                                margin-left: 6px;
                            }
                            &:not(:last-child){
                                margin-right: 40px;
                            }
                        }
                    }
                    div{
                        background-color: #eee;
                        width: 431px;
                        margin: 10px auto 0;
                        img{
                            width: 431px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .right{
                height: 276px;
                width: 450px;
                border: 2px solid #ddc196;
                h1{
                    height: 55px;
                    line-height: 55px;
                    padding: 0 20px;
                    border-bottom: 2px solid #ddc196;
                    img{
                        margin-top: 17px;
                        margin-left: 20px;
                    }

                }
                >div{
                    padding: 16px;
                    img{
                        margin-right: 16px;
                        margin-top: 20px;
                    }
                    h2{
                        font-size: 16px;
                        color: #c39469;
                        height: 36px;
                        line-height: 36px;
                    }
                    h3{
                        line-height: 26px;
                        span:not(:last-child){
                            margin-right: 10px;
                        }
                    }
                    h4{
                        margin-top: 10px;
                        button{
                            width: 190px;
                            height: 36px;
                            border-radius: 4px;
                            color: #fff;
                            background: linear-gradient(to right, #ddc196, #c39469);
                        }
                    }
                }
            }
        }
        .tradeSteps{
            margin: 20px 0;
            height: 26px;
            padding: 60px 0 20px;
            border: 2px solid #ddc196;
            position: relative;
            .stepBtn{
                position: absolute;
                height: 30px;
                line-height: 30px;
                text-align: center;
                width: 90px;
                border-radius: 4px;
                color: #fff;
                top: 20px;
                cursor: pointer;
                strong{
                    position: absolute;
                    left: -25px;
                    top: 35px;
                    width: 30px;
                    height: 2px;
                    transform: rotate(-30deg);
                }
                &:nth-child(2){
                    left: 340px;
                }
                &:nth-child(3){
                    left: 964px;
                }
                &:nth-child(4){
                    right: 195px;
                }
                &.finish{
                    background-color: #ddc196;
                    strong{
                        background-color: #ddc196;
                    }
                }
                &.wait{
                    background-color: #c0c4cc;
                    strong{
                        background-color: #c0c4cc;
                    }
                }
            }
        }
        .detailTabs{
            .left{
                width: 1200px;
                .left_box{
                    height: 471px;
                    padding: 10px 0;
                }
                .tabs_one{
                    height: 100%;
                    padding: 0 20px;
                }
                .tabs_two{
                    padding: 0 20px;
                    h1{
                        height: 50px;
                        line-height: 50px;
                        border-bottom: 1px solid #333;
                    }
                    div{
                        background-color: #f9f9f9;
                        padding: 20px;
                        h2{
                            height: 30px;
                            line-height: 30px;
                            margin-bottom: 30px;
                        }
                        p{
                            line-height: 30px;
                            margin-bottom: 30px;
                            text-indent: 2em;
                        }
                    }
                }
                .tabs_three{
                    padding: 0 20px;
                    ul{
                        li{
                            padding: 20px 0;
                            border-bottom: 1px solid #333;
                            div{
                                width: calc(100% - 340px);
                                h1{
                                    font-size: 16px;
                                    height: 50px;
                                    font-weight: bold;
                                }
                                p{
                                    line-height: 30px;
                                    text-indent: 2em;
                                }
                                h2{
                                    height: 20px;
                                    line-height: 20px;
                                    margin-top: 30px;
                                }
                            }
                        }
                    }
                }
                .tabs_five,.tabs_six{
                    padding: 0 20px;
                    height: 100%;
                }
                .tabs_seven{
                    .chart_line{
                        height: 235px;
                        width: 580px;
                    }
                    .chart_bar{
                        height: 236px;
                        width: 1160px;
                    }
                }
                .tabs_one_project{
                    padding: 10px 20px;
                    height: calc(100% - 20px);
                    p{
                        line-height: 30px;
                        text-indent: 2em;
                        font-weight: bold;
                    }
                    h1{
                        text-align: center;
                        img{
                            margin: 0 10px;
                        }
                    }
                }
                .tabs_two_project{
                    padding: 10px 20px;
                    height: calc(100% - 20px);
                    h1{
                        font-weight: bold;
                        font-size: 16px;
                        height: 50px;
                        line-height: 50px;
                    }
                    p{
                        line-height: 30px;
                        text-indent: 2em;
                        font-weight: bold;
                    }
                }
                .tabs_three_project{
                    padding: 10px 20px;
                    height: calc(100% - 20px);
                    p{
                        font-weight: bold;
                        text-indent: 2em;
                        line-height: 30px;
                    }
                }
                .tabs_four_project{
                    padding: 0 20px;
                    height: 100%;
                    ul{
                        li{
                            height: 56px;
                            line-height: 56px;
                            background: #f9f9f9;
                            margin: 10px 0;
                            padding: 0 20px;
                            span{
                                font-size: 16px;
                                font-weight: bold;
                            }
                            button{
                                width: 100px;
                                height: 36px;
                                line-height: 36px;
                                text-align: center;
                                color: white;
                                background: #fe6e67;
                                cursor: pointer;
                                border: none;
                                border-radius: 4px;
                                margin-left: 20px;
                                margin-top: 10px;
                            }
                        }
                    }
                }
                .tabs_five_project{
                    .chart_line{
                        height: 235px;
                        width: 600px;
                    }
                    .chart_bar{
                        height: 236px;
                        width: 1200px;
                    }
                }
                .tabs_eight{
                    padding: 10px 30px;
                    .tabs_eight_box{
                        height: 60px;
                        padding: 20px;
                        background-color: #f6f6f6;
                        cursor: pointer;
                        margin-bottom: 20px;
                        &.disabled{
                            background-color: #aaa;
                        }
                        h1{
                            height: 30px;
                            line-height: 30px;
                            font-size: 16px;
                        }
                    }
                }
            }
            .right{
                width: 640px;
                height: 530px;
                padding: 0 10px 10px;
                h1{
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    font-weight: bold;
                    padding-left: 10px;
                }
                .right_step{
                    padding: 28px 0 28px 30px;
                    background-color: #f9f9f9;
                    position: relative;
                    .btn{
                        width: 60px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 4px;
                        background-color: #d3b085;
                        color: #fff;
                        position: absolute;
                        left: 16px;
                        &:nth-child(3){
                            top: 26px;
                        }
                        &:nth-child(4){
                            top: 95px;
                        }
                        strong{
                            position: absolute;
                            top: 14px;
                            right: -40px;
                            width: 40px;
                            height: 2px;
                            background-color: #d3b085;
                        }
                    }
                    img{
                        position: absolute;
                        &:nth-child(5){
                            top: 10px;
                            left: 316px;
                        }
                        &:nth-child(6){
                            top: 10px;
                            left: 456px;
                        }
                        &:nth-child(7){
                            top: 78px;
                            left: 386px;
                        }
                        &:nth-child(8){
                            top: 78px;
                            left: 496px;
                        }
                    }
                }
                .right_blockChain{
                    border: 2px solid #3c73ff;
                    padding: 10px 20px;
                    border-radius: 6px;
                    margin-top: 10px;
                    h2{
                        font-size: 16px;
                        color: #ff0000;
                        height: 40px;
                        line-height: 40px;
                    }
                    .right_blockChain_msg{
                        background-color: #f9f9f9;
                        padding: 8px 20px;
                        h3{
                            font-size: 16px;
                            height: 26px;
                            line-height: 26px;
                        }
                        p{
                            height: 26px;
                            line-height: 26px;
                        }
                        ul{
                            height: 26px;
                            line-height: 26px;
                            li{
                                width: 185px;
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
        .overviewDialog{
            .overviewDialogBox{
                height: 660px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>

<style lang="scss">
    #detail{
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
        .el-steps{
            .el-step__head.is-finish{
                border-color: #d3b085;
                color: #fff;
                .el-step__icon.is-text{
                    background-color: #d3b085;
                }
            }
            .el-step__title.is-finish{
                color: #d3b085;
                font-size: 14px;
                height: 30px;
                line-height: 30px;
            }
            .el-step__description.is-finish{
                color: #d3b085;
            }
            .el-step__head.is-process{
                border-color: #d3b085;
                color: #d3b085;
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
        .overviewDialog{
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
                .el-dialog__body{
                    span{
                        color: #ed6a25;
                    }
                }
            }
        }
    }
</style>
