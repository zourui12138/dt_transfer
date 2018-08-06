<template>
    <div id="chainbox">
        <div class="title">认证 2018-05-05</div>
        <div class="message">
            <div class="one">实名认证</div>
            <div class="two">姓名：郑燕彬</div>
            <div class="two">身份证号：91510100716051014G</div>
            <div class="two">投资机构：红杉资本中国</div>
            <div class="two">职位：总经理</div>
            <div class="two">联系地址 ：成都高新区天府一街</div>
            <div class="two">邮编：621000</div>
        </div>
        <div class="message">
            <div class="one">上传的文件</div>
            <img src="../assets/img/platform/picc.png" alt="" style="position: relative;top: -15px">
        </div>
        <div class="message">
            <div class="one">哈希值：f224421398f0e74a0c0109057053d81423c38cd95c366170</div>
            <div class="two">业务类型：认证</div>
            <div class="two">操作类型：认证</div>
            <div class="two">发起方：郑燕彬</div>
            <div class="two">接收方：pingtaiguanli</div>
            <div class="two">验证码：2017021111</div>
            <div class="two">注册时间：2017-09-08 15:22</div>
        </div>
        <div class="message">
            <div class="one">共识信息</div>
            <div class="three">共识确认节点</div>
            <div class="three">共识确认时间</div>
            <div class="three">共识确认状态</div>
            <div class="three">节点1</div>
            <div class="three">2017-09-18 14:30</div>
            <div class="three">已确认</div>
            <div class="three">节点2</div>
            <div class="three">2017-09-18 14:06</div>
            <div class="three">已确认</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Box'

    }
</script>
<style lang="scss" scoped>
    #chainbox {
        width: 950px;
        height: 294px;
        border: 1px solid #3c73ff;
        border-radius: 5px;
        .title {
            padding-left: 15px;
            height: 40px;
            line-height: 40px;
            color: #e57a68;
            background: none;
        }
        > .message {
            width: 460px;
            height: 120px;
            background: #f9f9f9;
            float: left;
            margin-left: 10px;
            margin-bottom: 10px;
            &:nth-child(2) {
                margin-left: 15px;
            }
            &:nth-child(4) {
                margin-left: 15px;
            }
            .one {
                width: 80%;
                padding-left: 15px;
                height: 28px;
                line-height: 28px;
                padding-top: 10px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
            .two {
                float: left;
                padding-left: 15px;
                width: calc(50% - 15px);
                height: 24px;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
            .three {
                float: left;
                padding-left: 15px;
                width: calc(33% - 15px);
                height: 24px;
                line-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
        }
    }
</style>
