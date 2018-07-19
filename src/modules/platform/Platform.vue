<template>
    <div id="platform">
        <header class="header clear">
            <img class="fl" src="../../assets/img/platform/logo.png" alt="">
            <el-input class="fr" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="search"></el-input>
        </header>
        <VuePerfectScrollbar class="section" v-scroll><router-view/></VuePerfectScrollbar>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: "Platform",
        components: {VuePerfectScrollbar},
        data() {
            return{
                search: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    #platform{
        height: 100%;
        .header{
            height: 70px;
            line-height: 70px;
            background-color: #fff;
            padding: 0 100px;
            img{
                margin-top: 11px;
            }
            .el-input{
                width: 320px;
            }
        }
        .section{
            height: calc(100% - 110px);
            padding: 20px;
        }
    }
</style>
