<template>
    <div class="loginCard">
        <div>请确认登录管理后台的企业</div>
        <el-carousel :interval="3000" type="card" height="200px" :autoplay='true' :initial-index="0">
            <el-carousel-item v-for="item in merchant" :key="item" :initial-index="0">
                <h3 @click="loginCards(item.um_id,item.merchant_name)"><img :src="item.logo" alt=""></h3>
                <div class="loginCard_title">{{item.merchant_name}}</div>
            </el-carousel-item>
        </el-carousel>
        <div @click="goBacka($event)">返回</div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    beforeCreate() {
        // alert(1);
    },
    data() {
        return {}
    },
    computed: {
        // Getting Vuex State from store/modules/login
        ...mapState({
            merchant: state => state.login.merchants,
        })
    },
    methods: {
        goBacka() {
            this.$store.state.login.merchants = [];
            this.$emit("goBack");
        },
        loginCards(um_id1, um_id2) {
            console.log(um_id1); //当前幻灯片索引
            console.log(um_id2); //上一张幻灯片索引


            this.$router.push({
                name: 'homeContent'
            });
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
    background: url(/static/img/bg.png) no-repeat center center;
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
    font-size: 50px;
    color: #fff;
    font-family: ITC Avant Garda Gothic Demi Regular;
}

.login-center {
    font-size: 40px;
    color: #afacae;
}

span {
    color: #aca7a7;
}

.left-fir {
    top: 800px;
}

.login-entangle {
    width: 35%;
    position: absolute;
    top: 30%;
    left: 20%;
}

.login-bottom {
    font-size: 28px;
    margin-top: 42px;
}

.left-sec {
    margin-left: 30px;
}

.left-thi {
    margin-left: 30px;
}

.left-dot,
.right-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #aca7a7;
    display: inline-block;
    margin-left: 20px;
    margin-bottom: 5px;
}

.ms-login {
    margin-left: 10px;
    margin-top: 48px;
}

input::-webkit-input-placeholder {
    color: #a6a9ad;
}

.login-box {
    // width: 35%;
    text-align: center;
    position: absolute;
    top: 30%;
    left: 55%;
    border-left: solid 2px #a6a9ad;
}

.login-name {
    // width: 382px;
    font-size: 24px;
    color: #fff;
    font-family: "微软雅黑";
    margin-bottom: 24px;
    margin-left: 82px;
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
    // width: 382px;
    font-size: 16px;
    margin-bottom: 64px;
    margin-left: 48px;
    /*clear: both;*/
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
    height: 54px;
    font-size: 24px;
    border-radius: 30px;
    margin-left: 82px;
    background: #f05e5e;
    border: none;
    margin-bottom: 64px;
    color: #fff;
    margin-top: 4px;
    outline: none;
    &:hover {
        background: #803f3f;
    }
    &:active {
        background: #f05e5e;
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
    background: red;
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

