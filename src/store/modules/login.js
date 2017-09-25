import {
    Notification
} from 'element-ui'
// import request from 'superagent'
// import * as types from '../mutations-type'
import loginBox from '../../components/loginBox.vue'
import loginCard from '../../components/loginCard.vue'

const state = {
    TitleList: [],
    userInfor: {}, //save user login infor
    merchants: [], //save 组织列表
    menus: [],
    logged: {},
    logoSrc: {
        logo: '',
        merchantName: ''
    },
    CardBox: loginCard
}

const mutations = {
    addTab(state, targetName) {
        let obj = {};
        obj.title = targetName.title;
        obj.path = targetName.url;
        obj.name = targetName.name;
        if (state.TitleList) {
            for (let i = 0; i < state.TitleList.length; i++) {
                if (state.TitleList[i].name == targetName.name) {
                    return;
                }
            }
        }
        state.TitleList.push(obj);
        window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
    },
    deleTab(state, obj) {
        state.TitleList.splice(obj.index, 1);
        window.sessionStorage.setItem('key', JSON.stringify(state.TitleList));
        if (obj.index == 0) {
            obj.self.$router.push({
                name: 'homeContent'
            });
            return;
        }
        obj.self.$router.push({
            path: state.TitleList[obj.index - 1].path
            // path: state.TitleList[obj.index - 1].name
        });
    },
    setLogged(state,isLogged){
        state.logged.isLogged = isLogged;
    },
    pushUserInfor(state, data) {
        state.userInfor = data.userInfo; //push merchants(组织列表) 数据到state
    },
    pushMerchants(state, data) {
        state.merchants = data.merchants; //push merchants(组织列表) 数据到state
    },
    changeLoginCard(state) {
        state.CardBox = loginCard;
    },
    Notification(state, msg) { //登录成功提示信息 Box
        Notification({
            title: msg.title,
            message: msg.message,
            type: msg.type
        })
    }
}

const actions = {
    loginAPI({
        commit,
        state
    }, user) { //send login API
        // console.log(user);
        // user.self.$http.post('/api/user/login', {
            user.self.$http.post(user.self.api + '/user/login', {
            // number: user.name,
            // pass: user.pwd
            number: "13500000007",
            pass: "e10adc3949ba59abbe56e057f20f883e"
        }).then(data => {
            // alert(1);
            if (data.status == '403') {
                alert(data.data.message);
            } else if (data.data.status == '156') { //用户名或密码不正确
                alert(data.data.message);
                // this.$Message.error(res.data.message);
                console.log(data.data.message);
                return;
            } else if (data.status == '200') { //登录成功
                // this.$Message.success(res.data.message);
                console.log(data.data);
                commit('setLogged', '1');
                window.sessionStorage.setItem('setLogged', JSON.stringify(state.logged));
                commit('pushUserInfor', data.data.result);
                window.sessionStorage.setItem('userInfor', JSON.stringify(state.userInfor));
                console.log(state.userInfor);
                // console.log(data.data);
                if (data.data.result.userInfo.isMerchant >= '1') { //有组织列表
                    // if (data.data.result.merchants.length == '1') { //只有一个组织
                        if (data.data.result.merchants.length == '0') { //只有一个组织
                        alert(1);
                        commit('pushMerchants', data.data.result);
                        window.sessionStorage.setItem('merchants', JSON.stringify(state.merchants));
                        console.log(state.merchants);
                        user.self.$router.push({
                            name: 'homeContent'
                        });
                        commit('Notification', {
                            title: '',
                            message: '登录成功',
                            type: 'success'
                        });
                    }
                } else if (state.merchants.length > '1') { //有多个组织列表
                    // state.CardBox = loginBox;
                    console.log(data.data);

                } else if (data.data.result.userInfo.isMerchant == '0') { //无组织(不存在这种情况)
                    user.self.$router.push({
                        name: 'homeContent'
                    });
                }
            }
        }).catch(error => {
            commit('Notification', {
                title: '',
                message: '服务器异常,请稍后再试',
                type: 'error'
            });
            console.log(error);
        })
    }
}

export default {
    state,
    mutations,
    actions
}
