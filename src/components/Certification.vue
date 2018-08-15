<template>
    <div id="certification">
        <ul class="clear">
            <li class="fl">
                <h1>来源证书</h1>
                <h2>证书信息</h2>
                <div><img src="../assets/img/platform/certification/QrCode.png" alt=""></div>
                <div>
                    <h3>信息来源：</h3>
                    <p>{{certificationData.infoSources}}</p>
                </div>
                <div>
                    <h3>来源方式：</h3>
                    <p>{{certificationData.sourceMethod}}</p>
                </div>
                <div>
                    <h3>有效起止时间：</h3>
                    <p>2018-07-01<span>到</span>2023-07-01</p>
                </div>
            </li>
            <li class="fr">
                <h1>认证证书</h1>
                <h2>证书信息</h2>
                <div><img src="../assets/img/platform/certification/QrCode.png" alt=""></div>
                <div>
                    <h3>认证方：</h3>
                    <p>{{certificationData.certificationBody}}</p>
                </div>
                <div>
                    <h3>认证方式：</h3>
                    <p>{{certificationData.certifiMethod}}</p>
                </div>
                <div>
                    <h3>有效起止时间：</h3>
                    <p>2018-07-01<span>到</span>2023-07-01</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Certification",
        props: ['certificationData']
    }
</script>

<style lang="scss" scoped>
    @function imgUrl($name) {
        @return '../assets/img/platform/certification/'+$name;
    }
    // 证书信息弹框
    #certification{
        ul{
            li{
                width: 280px;
                height: 400px;
                background: url(imgUrl('certificate.png')) no-repeat center;
                padding: 30px;
                h1{
                    font-size: 24px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                }
                h2{
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    padding-left: 30px;
                    border-bottom: 1px solid #eee;
                }
                h3{
                    height: 30px;
                    line-height: 30px;
                }
                h4{
                    height: 90px;
                    line-height: 30px;
                    padding-left: 30px;
                    overflow: hidden;
                }
                p{
                    height: 30px;
                    line-height: 30px;
                    padding-left: 30px;
                    overflow: hidden;
                    span{
                        margin: 0 4px;
                    }
                }
                div:nth-child(3){
                    border-bottom: 1px solid #eee;
                    text-align: center;
                    img{
                        height: 130px;
                    }
                }
            }
        }
    }
</style>
