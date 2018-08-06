// 作者：小丶张学友
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

// 引入element-ui
import '../theme/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// moment
import moment from 'moment'
Vue.filter('dateFormat', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD';
    return moment(value).format(formatString); // value可以是普通日期 20170723
});

Vue.filter('initNum', function (num) {
    if(num !== undefined){
        let a = num.toString().split("");
        let i = a.length-1;
        while(i>=3) {
            a.splice(i-2,0,",");
            i = i - 3;
        }
        return a.join("");
    }
});

// 滚动插件指令之每次加载都回到页面顶部
Vue.directive('scroll', {
    // 当组件完成一次更新时调用 还有其它的钩子函数 自行选择合适的
    componentUpdated:  (el) => {el.scrollTop = 0;}
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
