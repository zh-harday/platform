<template>
    <div class="register-wrap">
        <div class="register-case">
            <div class="register-name">
                <p>领投者企业注册</p>
                <span>Lead investor enterprise registration</span>
            </div>
            <div class="register-box">
                <div class="register-ph">
                    <label>手机号码：</label>
                    <input type="text" class="register-phone" placeholder="请输入手机号" @input="checkVata" v-model="phonecontactPhone">
                </div>
                <div class="register-co">
                    <label>手机验证码：</label>
                    <input type="text" class="register-code" placeholder="请输入验证码" @input="checkVata" v-model="validationCode">
                </div>
            </div>
            <!-- <button type="button" class="code-btn" @click="time" :class="{ 'active-code':valuePhone,'active-time':valueTime}">{{btnText}}</button> -->
            <el-button :class="{'active-code':!isSendCode,}" @click="sendVerificationCode" class="code-btn" :disabled="isSendCode" type="primary">{{btnText}}</el-button>
            <button type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">确 定</button></button>
            <!-- <router-link to="/login" type="button" class="register-btn" @click="submitForm" :class="{ active:valueData }">下一步</router-link> -->
        </div>
    </div>
</template>


<script>
import ElementUI from 'element-ui'
export default {
    data() {
        return {
            phonecontactPhone: '', //手机号码
            validationCode: '', //验证码
            isSendCode: true, //是否可以发送验证码
            valueData: false, //所有输入的值是否通过验证
            // valuePhone: false, //手机号是否验证通过
            // valueTime: false,
            btnText: '获取验证码',
            isValidationCode: false,
        }
    },
    methods: {
        /*******************验证表单开始*************************/
        checkVata() {
            if (this.checkPhone(this.phonecontactPhone) && this.validationCode) {
                this.valueData = true;
                this.isSendCode = false;
            }
            else if (this.checkPhone(this.phonecontactPhone)) {
                this.isSendCode = false;
                this.valueData = false;
            } else {
                this.isSendCode = true;
                this.valueData = false;
            }
        },
        /***********************验证表单结束***************************************/

        /***********************手机号码验证开始************************************************/
        checkPhone(phone) {
            var pattern = /^1[34578][0-9]{9}$/;
            if (phone != '') {
                if (pattern.test(phone)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        /************************手机号码验证结束*************************************/

        /************************验证码倒计时开始************************************/
        time() {
            if ( this.isSendCode == 0 ) {
                // alert(111);
                // this.sendVerificationCode();
                this.valueData = false;
                var that = this;
                var sec = 60;
                var timer1 = setInterval(
                    function() {
                        that.isSendCode = true;
                        that.btnText = sec + 's';
                        if (sec < 0) {
                            that.isSendCode = false;
                            clearInterval(timer1);
                            that.btnText = '获取验证码';
                        }
                        sec--;
                    }
                    , 1000);
            }
        },
        sendVerificationCode() { //发送验证码 Ajax
            this.$http.post('api/merchant/validationCode', {
                contactPhone: this.phonecontactPhone
            })
                .then(res => {
                    if (res.data.status == '200') {
                        // this.provinces = res.data.result;
                        this.time();
                        this.isValidationCode = 1;
                        console.log(res.data);
                    } else if (res.data.status == '1006') { //手机号已注册
                        // console.log(res.data);
                        this.isSendCode = 1;
                        alert(res.data.message);
                    } else if (res.data.status == '1008') { //手机号不合法
                        // console.log(res.data);
                        this.isSendCode = 1;
                        alert(res.data.message);
                    } else if (res.data.status == '403') { //服务器异常
                        // console.log(res.data);
                        this.isSendCode = 1;
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        },
        /************************验证码倒计时结束*********************/

        /***********************提交表单开始*************************/
        submitForm() {
            if (this.valueData && this.isValidationCode) {
                this.$store.state.register.register.contactPhone = this.phonecontactPhone;
                this.$store.state.register.register.validationCode = this.validationCode;
                // this.$http.post('api/merchant/register', this.$store.state.register.register)
                //     .then(res => {
                //         if (res.data.status == '200') { //注册数据验证通过
                //             // alert(111);
                //             // this.provinces = res.data.result;
                            this.$router.push({ name: 'register' }); //进入下一步页面
                //             this.$store.state.register.isVshowYe = false; //首次登陆用户不显示首页
                //             // console.log(res.data);
                //         } else if (res.data.status == '403') { //网络异常
                //             // console.log(res.data);
                //             alert(res.data.message);
                //         }
                //     })
                //     .catch(error => {
                //         // alert(222);
                //         console.log(error);
                //     })
                //    this.$router.push({ name: 'register' });
                // console.log(this.$store.state.register.register);
            }
        }
        /************************提交表单结束********************************/
    }
}
</script>



<style scoped>
html,
body {
    width: 100%;
    height: 100%;
    font-family: ITC Avant Garda Gothic Demi Regular;
}

.register-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    background: url(/static/img/register_bg.png) no-repeat center;
}

.register-case {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 700px;
    height: 600px;
}

.register-name {
    position: absolute;
    top: 45px;
    left: 205px;
    width: 300px;
    height: 45px;
    font-size: 36px;
    text-align: center;
}

.register-name span {
    font-size: 14px;
}

.register-box {
    position: absolute;
    top: 160px;
    left: 60px;
    width: 700px;
    height: 350px;
    font-size: 16px;
}

.register-box label {
    display: inline-block;
    width: 100px;
    text-align: right;
}

input::-webkit-input-placeholder {
    color: #a6a9ad;
}

.register-ph,
.register-co {
    width: 500px;
    height: 100px;
}

.register-phone,
.register-code {
    width: 300px;
    height: 36px;
    padding: 10px 15px;
    margin-left: 20px;
    font-size: 16px;
    /* color: #fff; */
    border: none;
    /* border-bottom: 2px solid #a6a9ad; */
    border-radius: 4px;
    outline: none;
    /* background: transparent; */
}

.code-btn {
    position: absolute;
    top: 260px;
    left: 545px;
    width: 110px;
    height: 40px;
    font-size: 16px;
    color: #fff;
    outline: none;
    border: 2px solid #fff;
    border-radius: 15px;
    background: gray;
}

.register-btn {
    position: absolute;
    top: 440px;
    left: 180px;
    display: inline-block;
    width: 350px;
    height: 45px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 45px;
    background: #f05e5e;
    border: none;
    border-radius: 30px;
    outline: none;
}

.active-code {
    background: orange;
}

.active-time {
    background: red;
}

.active {
    background: red;
}
</style>