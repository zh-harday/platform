<template>
    <div>
        <div class="login-name">欢迎登录</div>
        <div class="login-ac">
            <input type="text" class="login-account" @input="checkVataa" v-model="name" placeholder="请输入账号/手机号" required>
        </div>
        <div class="login-pass">
            <input type="password" class="login-account" @input="checkVataa" v-model="password" placeholder="请输入密码" required>
        </div>
    </div>
</template>
<script>
export default {
    watch: {
        name(val) {
            this.$emit('changeName', val);
        },
        password(val) {
            this.$emit('changePassword', val);
        },
    },
    data() {
        return {
            checked: false,
            name: '',
            password: '',
            pass: true,
        }
    },
    methods: {
        checkVataa() {
            if (this.name && this.password) {
                this.$emit("sendVal", 1)
            } else {
                this.$emit("sendVal", 0)
            }
        },
    }
}
</script>



<style lang="less" scoped>
// input::-webkit-input-placeholder {
//     // color: #a6a9ad;
// }
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
    // width: 382px;
    font-size: 22px;
    color: #fff;
    font-family: "微软雅黑";
    margin-bottom: 24px;
}

.login-account {
    width: 382px; // height: 84px;
    margin-top: 30px;
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
    margin-left: 6%;
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
    cursor: pointer;
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
    // margin-left: 82px;
    background: #f05e5e;
    border: none;
    margin-bottom: 64px;
    color: #fff;
    margin-top: 4px;
    outline: none;
    &:hover {
        background: #5076e0;;
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

