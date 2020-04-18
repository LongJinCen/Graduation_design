<template>
  <div class="login center">
    <div class="login-way">
      <span
        :class="emailWayClass"
        @click="changeLoginWay('email')"
      >
        <i class="el-icon-message" />
        <span>邮箱登录</span>
      </span>
      <span class="line" />
      <span
        :class="phoneWayClass"
        @click="changeLoginWay('phone')"
      >
        <i class="el-icon-mobile" />
        <span>手机登录</span>
      </span>
    </div>
    <el-form
      v-show="emailLogin"
      ref="Form"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <el-form
      v-show="phoneLogin"
      ref="Form"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="phoneNumber">
        <el-input
          v-model="form.phoneNumber"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="verifycode">
        <el-input
          v-model="form.verifycode"
          placeholder="请输入验证码"
        >
          <el-button
            slot="append"
            :class="verifycodeClass"
            :disabled="verifying"
            @click="getVerifyCodeByPhone"
          >
            {{
              verifying ? second + 's 后刷新' : '获取验证码'
            }}
          </el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="login-agreement">
      登录即视为同意 <a
        href="#"
        class="link link-blue-text"
      >服务协议</a> 及 <a
        href="#"
        class="link link-blue-text"
      >隐私政策</a>
    </div>
    <el-button type="primary">
      登录
    </el-button>
    <div class="login-other">
      <span
        class="link"
        @click="register"
      >注册</span>
      <span class="line" />
      <span
        class="link"
        @click="forgetPassword"
      >忘记密码</span>
    </div>
  </div>
</template>
<script>
import rules from '../common/rule.js'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: '',
        verifycode: '',
        phoneNumber: ''
      },
      rules: {
        email: rules.email,
        password: rules.password,
        verifycode: rules.verifycode,
        phoneNumber: rules.phoneNumber
      },
      emailLogin: true,
      phoneLogin: false,
      verifying: false,
      second: 60,
      timer: null
    }
  },
  computed: {
    emailWayClass () {
      return [this.emailLogin ? 'link-active' : '']
    },
    phoneWayClass () {
      return [this.phoneLogin ? 'link-active' : '']
    },
    verifycodeClass () {
      return this.verifying ? ['login-verifyingcode'] : ['login-verifycode']
    }
  },
  mounted () {
    this.getVerifyCode()
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    forgetPassword () {
      this.$router.push('/forget')
    },
    getVerifyCode () {

    },
    getVerifyCodeByPhone () {
      this.countdown()
    },
    countdown () {
      if (this.timer) {
        return
      }
      this.verifying = true
      this.timer = setInterval(() => {
        if (this.second === 1) {
          clearInterval(this.timer)
          this.verifying = false
          this.second = 60
          return
        }
        this.second = this.second - 1
      }, 1000)
    },
    changeLoginWay (type) {
      switch (type) {
        case 'email':
          this.emailLogin = true
          this.phoneLogin = false
          break
        case 'phone':
          this.emailLogin = false
          this.phoneLogin = true
          break
      }
    }
  }
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
