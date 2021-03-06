import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import echarts from 'echarts';
import md5 from 'js-md5';
// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');

import axios from 'axios';
import Qs from 'qs'
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';

Vue.use(iView);
Vue.use(echarts);
Vue.use(ElementUI);

Vue.prototype.$http = axios;
Vue.prototype.md5 = md5;
// Vue.prototype.api = '/api'; //公司IP请求时 URL
// Vue.prototype.api = 'http://sdwlyxgs.imwork.net:12026'; //外网请求时 URL
Vue.prototype.api = 'http://192.168.0.118:9092'; //外网请求时 URL
// Vue.prototype.api = ''; //上线时 URL

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
