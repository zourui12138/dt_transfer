<template>
    <div id="platform">
        <header class="header clear">
            <img class="fl" src="../../assets/img/platform/logo.png" alt="">
            <el-menu :default-active="$route.path" class="fl nav" mode="horizontal" router>
                <el-menu-item index="/platform/home">主页</el-menu-item>
                <el-menu-item index="/platform/transferMsg">转让搜索</el-menu-item>
                <el-menu-item index="/platform/myTransfer">我的转让</el-menu-item>
                <el-menu-item index="/platform/release">发布转让</el-menu-item>
            </el-menu>
        </header>
        <VuePerfectScrollbar class="section" v-scroll><router-view/></VuePerfectScrollbar>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: "Platform",
        components: {VuePerfectScrollbar}
    }
</script>

<style lang="scss" scoped>
    #platform{
        height: 100%;
        .header{
            height: 70px;
            line-height: 70px;
            background-color: #fff;
            img{
                margin: 8px 140px 0 150px;
            }
        }
        .section{
            height: calc(100% - 110px);
            padding: 20px;
        }
    }
</style>

<style lang="scss">
    #platform{
        .el-menu--horizontal {
            border-bottom: none;
            > .el-menu-item{
                font-size: 18px;
                margin-right: 100px;
                color: #333;
                &:not(.is-disabled):hover,&:not(.is-disabled):hover{
                    color: #5f6ac0;
                }
                &.is-active{
                    border-bottom: 2px solid #5f6ac0;
                    color: #5f6ac0;
                }
            }
        }
    }
</style>
