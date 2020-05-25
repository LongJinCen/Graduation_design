<template>
  <div class="login absolute-center">
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
      ref="Form1"
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
      ref="Form2"
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
    <el-button
      type="primary"
      @click="login"
    >
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
import * as regexp from '@/const/regexp.js'
import apis from '@/const/api.js'
import axios from 'axios'
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
  methods: {
    login () {
      console.log('fdsfds')
      let formType = ''
      let url = ''
      const data = {}
      if (this.emailLogin) {
        formType = 'Form1'
        data.email = this.form.email
        data.password = this.form.password
        url = apis.user.loginWithEmail
      }
      if (this.phoneLogin) {
        formType = 'Form2'
        data.verifycode = this.form.verifycode
        data.phoneNumber = this.form.phoneNumber
        url = apis.user.loginWithPhone
      }
      this.$refs[formType].validate((valid) => {
        if (!valid) {
          return
        }
        axios.post(url, data).then((data) => {
          if (data.data.code === 0) {
            this.redirectToIndex()
          } else {
            this.$message({
              message: data.data.message,
              type: 'error'
            })
          }
        })
      })
    },
    redirectToIndex () {
      window.location.href = '/ad/index.html'
    },
    register () {
      this.$router.push('/register')
    },
    forgetPassword () {
      this.$router.push('/forget')
    },
    getVerifyCode () {
      axios.post(apis.verify.phone, {
        phoneNumber: this.form.phoneNumber
      }).then((data) => {
        if (data.data.code === 0) {
          this.$message({
            message: data.data.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: data.data.message,
            type: 'error'
          })
        }
      })
    },
    getVerifyCodeByPhone () {
      if (this.form.phoneNumber.length === 0) {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
        return
      }
      if (!regexp.phoneNumber.test(this.form.phoneNumber)) {
        this.$message({
          message: '手机号格式不正确',
          type: 'warning'
        })
        return
      }
      this.countdown()
      this.getVerifyCode()
    },
    countdown () {
      if (this.timer) {
        return
      }
      this.verifying = true
      this.timer = setInterval(() => {
        if (this.second === 1) {
          clearInterval(this.timer)
          this.timer = null
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
    background-color: #fff;
    padding: 24px 31px 50px 31px;

    &-way {
      margin-bottom: 20px;
      padding: 0 20px;
      display: flex;
      justify-content: space-around;
      color: #444;

      & > span {
        cursor: pointer;
      }
    }

    &-verifycode {
      background-color: #409eff !important;
      color: #fff !important;
      border-radius: 0 !important;

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
      color: #999;
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
      color: #444;
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
