<template>
  <div class="forget absolute absolute-center">
    <template v-if="!showSuccess">
      <div class="forget-weclome">
        欢迎您
      </div>
      <div class="forget-reset-password">
        重置密码
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="phoneOrEmail">
          <el-input
            v-model="form.phoneOrEmail"
            placeholder="手机号/邮箱"
          />
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="form.newPassword"
            placeholder="新密码"
          />
        </el-form-item>
        <el-form-item prop="comfirmPassword">
          <el-input
            v-model="form.comfirmPassword"
            placeholder="确认密码"
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
      <el-button
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
    </template>
    <div
      v-if="showSuccess"
      class="forget-success"
    >
      修改密码成功，正在跳转到登录页...
    </div>
  </div>
</template>

<script>
import * as regexp from '@/const/regexp.js'
import rules from '../common/rule.js'
export default {
  name: 'Forget',
  data () {
    return {
      form: {
        phoneOrEmail: '',
        newPassword: '',
        comfirmPassword: '',
        verifycode: ''
      },
      verifying: false,
      timer: null,
      second: 60,
      rules: {
        phoneOrEmail: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入手机号或者邮箱'))
                return
              }
              if (value.indexOf('@')) {
                if (!regexp.email.test(value)) {
                  callback(new Error('邮箱格式不正确'))
                }
                return
              }
              if (!regexp.phoneNumber.test(value)) {
                callback(new Error('手机号格式不正确'))
              }
            },
            trigger: 'blur'
          }
        ],
        newPassword: rules.password,
        comfirmPassword: rules.password,
        verifycode: rules.verifycode
      },
      showSuccess: false
    }
  },
  computed: {
    verifycodeClass () {
      return this.verifying ? ['forget-verifyingcode'] : ['forget-verifycode']
    }
  },
  methods: {
    getVerifyCodeByPhone () {
      if (this.form.phoneOrEmail.indexOf('@')) {
        if (!regexp.email.test(this.form.phoneOrEmail)) {
          this.$message({
            message: '邮箱格式不正确',
            type: 'warning'
          })
          return
        }
        this.getVerifycode('email')
      } else {
        if (!regexp.phoneNumber.test(this.form.phoneOrEmail)) {
          this.$message({
            message: '手机号格式不正确',
            type: 'warning'
          })
          return
        }
        this.getVerifycode('phone')
      }
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
          this.timer = null
          this.verifying = false
          this.second = 60
          return
        }
        this.second = this.second - 1
      }, 1000)
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        // TODO: 发借口获取修改数据
        this.showSuccess = true
        this.goLogin()
      })
    },
    goLogin () {
      setTimeout(() => {
        window.location.href = '/ad/login.html#/'
      }, 2000)
    },
    getVerifycode (type) {
      // TODO: 发借口获取验证码
    }
  }
}
</script>

<style lang="less">
@import "../../../style/variable.less";

.forget {
  width: 400px;

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

  &-weclome {
    font-size: 32px;
    font-weight: 600;
    line-height: 45px;
    color: @font-black;
    margin-bottom: 48px;
  }

  &-reset-password {
    font-size: 16px;
    color: #222;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 20px;
  }

  .el-button--primary {
    width: 100%;
  }

  &-success {
    text-align: center;
    font-size: 20px;
    color: #303133;
  }
}
</style>
