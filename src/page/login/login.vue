<template>
    <Layout>
        <div class="login center">
            <div class="login-way" >
                <span :class="emailWayClass" @click="changeLoginWay('email')">
                    <i class="el-icon-message"/>
                    <span>邮箱登录</span>
                </span>
                <span class="line"></span>
                <span :class="phoneWayClass" @click="changeLoginWay('phone')">
                    <i class="el-icon-mobile"/>
                    <span>手机登录</span>
                </span>
            </div>
            <el-form :model="form" :rules="rules" ref="Form" v-show="emailLogin">
                <el-form-item prop="account">
                    <el-input v-model="form.account" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" :rules="rules" ref="Form" v-show="phoneLogin">
                <el-form-item prop="account">
                    <el-input v-model="form.phoneNumber" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.verifycode" placeholder="请输入验证码">
                        <el-button slot="append" :class="verifycodeClass" @click="getVerifyCodeByPhone" :disabled="verifying">
                            {{
                                verifying ? second + 's' : '获取验证码'
                            }}
                        </el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="login-agreement">
                登录即视为同意<a href="#" class="link link-blue-text">服务协议</a>及<a href="#" class="link link-blue-text">隐私政策</a>
            </div>
            <el-button type="primary">登录</el-button>
            <div class="login-other" >
                <span class="link" @click="register">注册</span>
                <span class="line"></span>
                <span class="link" @click="forgetPassword">忘记密码</span>
            </div>
        </div>
    </Layout>
</template>
<script>
import Layout from '@/component/layout/layout.vue'
export default {
    name: 'Login',
    components: {
        Layout
    },
    data() {
        return {
            form: {
                account: '',
                password: '',
                verifycode: '',
                phoneNumber: '',
                verifycode: ''
            },
            rules: {
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }, { min: 0, max: 20, message: '长度在 30到 20 个字符', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }]
            },
            emailLogin: true,
            phoneLogin: false,
            verifying: false,
            second: 60,
            timer: null
        }
    },
    methods: {
        register() {
            window.open('/ad/register')
        },
        forgetPassword() {

        },
        getVerifyCode() {
            
        },
        getVerifyCodeByPhone() {
            this.countdown()
        },
        countdown() {
            if (this.timer) {
                return
            }
            this.verifying = true
            this.timer = setInterval(() => {
                if (this.second === 1) {
                    clearInterval(this.timer)
                    this.verifying = false
                    return
                }
                this.second = this.second - 1
            }, 1000);
        },
        changeLoginWay(type) {
            switch (type) {
                case 'email':
                    this.emailLogin = true
                    this.phoneLogin = false
                    break;
                case 'phone':
                    this.emailLogin = false
                    this.phoneLogin = true
                    break;
            }
        }
    },
    computed: {
        emailWayClass() {
            return [this.emailLogin ? 'link-active' : '']
        },
        phoneWayClass() {
            return [this.phoneLogin ? 'link-active' : '']
        },
        verifycodeClass() {
            return this.verifying ? ['login-verifyingcode'] : ['login-verifycode']
        }
    },
    mounted() {
        this.getVerifyCode()
    },
}
</script>
<style lang="less" scoped>
    .login {
        background-color: #ffffff;
        padding: 24px 31px 50px 31px;
        &-way {
            margin-bottom: 20px;
            padding: 0 20px;
            display: flex;
            justify-content: space-around;
            color: #444444;
            & > span {
                cursor: pointer;
            }
        }
        &-verifycode {
            background-color: #409eff !important;
            color: #ffffff !important;
            border-radius: 0px !important;
            &:hover {
                background-color: #66b1ff !important;
            }
        }
        &-verifyingcode {
            width: 112px;
            height: 38px;
            &:hover {
                background-color: transparent !important;
            }
        }
        &-agreement {
            text-align: center;
            color: #999999;
            font-size: 14px;
            margin-top: 40px;
            margin-bottom: 10px;
            a {
                text-decoration: none;
                color: #2a90d7;
                cursor: pointer;
            }
        }
        &-other {
            display: flex;
            justify-content: space-around;
            padding: 10px 70px;
            font-size: 12px;
            color: #444444;
            margin-top: 10px;
        }
    }
    .el-form {
        width: 380px;
        border-radius: 4px;
    }
    .el-button--primary {
        width: 100%;
    }
</style>