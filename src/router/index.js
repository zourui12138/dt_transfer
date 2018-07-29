import Vue from 'vue'
import Router from 'vue-router'

import Platform from '../modules/platform/Platform'
import Home from '../modules/platform/home/Home'
import TransferMsg from '../modules/platform/transferMsg/TransferMsg'
import MyTransfer from '../modules/platform/myTransfer/MyTransfer'
import Release from '../modules/platform/release/Release'
import Detail from '../modules/platform/detail/Detail'
import Contract from '../modules/platform/contract/Contract'

Vue.use(Router);

export default new Router({
    routes: [
        // 重定向
        {
            path: '/',
            redirect: '/platform/home'
        },
        {
            path: '/platform',
            name: 'platform',
            component: Platform,
            children: [
                {
                    path: '/platform/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/platform/transferMsg',
                    name: 'transferMsg',
                    component: TransferMsg
                },
                {
                    path: '/platform/myTransfer',
                    name: 'myTransfer',
                    component: MyTransfer
                },
                {
                    path: '/platform/release',
                    name: 'release',
                    component: Release
                },
                {
                    path: '/platform/detail',
                    name: 'detail',
                    component: Detail
                },
                {
                    path: '/platform/contract',
                    name: 'contract',
                    component: Contract
                }
            ]
        }
    ]
});
