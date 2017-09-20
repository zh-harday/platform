<template>
    <div class="login-wrap">
        <div>
            <div class="login-top">
                <span>
                    <img src="/static/img/images/logo_02.png" style="width:75px;height:75px"></img>
                </span>
                <div class="right_text">
                    <span class="rtext_top">独角兽</span>
                    <span class="rtext_bottom">THE UNLCORN</span>
                </div>
                <div style="border-left:6px solid #fff;padding-left:15px;">
                    <span style="font-size:50px;font-weight:bold;color:#fff;">价值投资 远见卓识</span>
                </div>
            </div>

            <div class="login-entangle">
                <p class="login-left">项目类型</p>
                <div class="login-bottom">
                    <span class="left-fir">高效</span>
                    <span class="left-dot"></span>
                    <span class="left-sec">信任</span>
                    <span class="right-dot"></span>
                    <span class="left-thi">依赖</span>
                </div>
            </div>
            <div class="login-box">
                <component :is="CardBox" @goBack="goBack" @checkVata="checkVataa" @changePassword="getPwd" @changeName="getName" @sendVal="getval">
                </component>
                <div class="find-pass">
                    <el-checkbox v-model="checked" style="color:#fff">记住密码，下次直接登录</el-checkbox>
                </div>
                <div class="login_btn">
                    <button type="button" class="login-btn" @click="submitForm" :class="{ active : valueData }">登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import md5 from 'js-md5'
export default {
    computed: {
        ...mapState({
            CardBox: state => state.login.CardBox,
            merchant: state => state.login.merchants,
        }),
    },
    data() {
        return {
            checked: false,
            userName: '',
            passWord: '',
            valueData: false,
            loginImg: [
                { logo: "../static/img/2.png", merchant_name: "阿里巴巴1" },
            ],
        }
    },
    methods: {
        getName(val) {
            this.userName = val;
        },
        getPwd(val) {
            this.passWord = val;
        },
        getval(val) {
            if (val) {
                this.valueData = true;
            } else {
                this.valueData = false;
            }
        },
        submitForm() {
            // console.log(this.checked);
            if (this.valueData) {
                sessionStorage.clear();
                this.$router.push({ name: 'homeContent' });
                let number = this.userName;
                // let pass = this.passWord;
                let pass = md5(this.passWord, 32);
                // console.log(pass);
                this.userName = '';
                this.passWord = '';
                this.valueData = false;
                this.$store.dispatch({
                    type: 'loginAPI',
                    name: number,
                    pwd: pass,
                    self: this
                });
                // console.log(pass);
            }
        },
        goBack($event) {
            this.$store.commit('changeLoginCard');
        }
    }
}
</script>

<style lang="less" scoped>
html,
body {
    width: 100%;
    height: 100%;
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(/static/img/images/bg_02.png) no-repeat center center;
    >div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
    }
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}

.login-left {
    font-size: 30px;
    color: #fff;
    font-family: ITC Avant Garda Gothic Demi Regular;
}

span {
    color: #aca7a7;
}

.left-fir {
    top: 800px;
}

.login-top {
    position: absolute;
    display: flex;
    align-items: center;
    width: 50%;
    top: 12%;
    left: 17%;
    color: #fff;
}

.right_text {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-right: 55px;
}

.rtext_top {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
}

.rtext_bottom {
    font-size: 22px;
    color: #fff;
}

.login-entangle {
    width: 35%;
    position: absolute;
    top: 50%;
    left: 17%;
}

.login-bottom {
    font-size: 28px;
    margin-top: 25px;
}

.left-sec {
    margin-left: 5px;
}

.left-thi {
    margin-left: 5px;
}

.left-dot,
.right-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    margin-left: 5px;
    margin-bottom: 5px;
}

// .ms-login {
//     margin-left: 10px;
//     margin-top: 48px;
// }
input::-webkit-input-placeholder {
    color: #a6a9ad;
}

.login-box {
    position: absolute;
    top: 50%;
    left: 58%;
    padding: 15px 10px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(134, 144, 164, 0.5);
}

.login-name {
    font-size: 22px;
    color: #fff;
    font-family: "微软雅黑";
    margin-bottom: 24px; // margin-left: 82px;
}

.login-account {
    width: 382px;
    height: 84px;
    background: transparent;
    border: none;
    font-size: 20px;
    outline: none;
    color: #fff;
}

.login-ac,
.login-pass {
    // width: 330px;
    height: 84px;
    padding-left: 48px;
    border-bottom: solid 2px #a6a9ad;
    margin-left: 10%;
    /*margin-bottom: 16px;*/
}

.login-ac {
    background: url(/static/img/账号.png) no-repeat left center;
}

.login-pass {
    background: url(/static/img/密码.png) no-repeat left center;
    margin-bottom: 16px;
}

.find-pass {
    text-align: left;
    margin: 10px 0 64px 22px;
    margin-left: 22px;
    font-size: 16px;
    color: #fff;
}

.pass-find {
    color: #fff;
    float: left;
}

.pass-zhuce {
    color: #fff;
    float: right;
}

.login-btn {
    width: 382px;
    height: 45px;
    font-size: 20px;
    border-radius: 5px; // margin-left: 82px;
    background: #5076b0;
    border: none;
    margin-bottom: 64px;
    color: #fff;
    margin-top: 4px;
    outline: none;
    &:hover {
        background: #5076e0;
    }
    &:active {
        background: blue;
    }
}

.login-right-bottom {
    width: 382px;
    margin-left: 82px;
    display: flex;
    justify-content: space-between;
}

.login-right-bottom p {
    width: 33.33%;
    float: left;
}

.login-footer {
    margin-left: 82px;
}

.login-footer p {
    width: 33.33%;
    float: left;
    color: #fff;
    font-size: 12px;
}

.hr {
    width: 382px;
    border: solid 1px #a6a9ad;
    margin-left: 82px;
    margin-bottom: 16px;
}

.active {
    background: blue;
}

.loginCard {
    margin-left: 78px;
    position: relative;
    .loginCard_title {
        // position: absolute;
        color: #ffffff;
        margin-top: 246px;
    }
    >div:nth-child(1) {
        color: #fff;
        position: absolute;
        top: -40px;
        left: 67px;
        font-size: 20px;
        font-weight: bolder;
    }
    >div:nth-child(2) {
        padding-bottom: 40px;
        overflow: hidden;
        >div {
            overflow: auto;
        }
    }
    >div:nth-child(3) {
        color: #ffffff;
        position: absolute;
        right: 0;
        top: 400px;
    }
}

.login_btn {
    margin-top: 65px;
}

.el-carousel__item {
    // margin: 0 auto;
    // margin-left: 82px;
    overflow: visible;
    h3 {
        // position: relative;
        color: #475669;
        font-size: 14px; // opacity: 0.75;
        line-height: 200px;
        background: #ffffff;
        margin: 0;
        >img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 112px;
            height: 112px;
        }
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
