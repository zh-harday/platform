import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'
import state from 'vuex'

Vue.use(Router)
// import r1 from "./r1"
import r2 from "./r2"
// import r3 from "./r3"
// import r4 from "./r4"
let arr = [];
arr = arr.concat(r2)

const router = new Router({
    // mode: 'history',
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['../components/Home.vue'], resolve),
            children: arr
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../views/Login.vue'], resolve)
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['../views/Register.vue'], resolve)
        },
        {
            path: '/registerphone',
            name: 'registerphone',
            component: resolve => require(['../views/RegisterPhone.vue'], resolve)
        }

    ]
})
router.beforeEach((to, from, next) => { //在所有导航完成之前先判断是否已经登录
    if(to.path == '/login' || to.path == '/registerphone' || to.path == '/register'){
        next();
        return;
    };
    store.state.login.logged = JSON.parse(sessionStorage.getItem('setLogged')) || {};
    var isLogin = store.state.login.logged.isLogged;
    // console.log(isLogin);
    if (isLogin ) {
        // alert(111);
        next()   // 进行下一个钩子函数  
    }else {
       next({path: '/login'})   //  跳转到login页面  
    }
})
export default router