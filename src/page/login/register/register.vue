<template>
  <div class="register horizontal-center">
    <el-steps
      :active="active"
      class="register-step"
      finish-status="success"
    >
      <el-step title="联系方式" />
      <el-step title="登录注册" />
      <el-step title="帐户信息" />
    </el-steps>
    <div class="form">
      <el-form
        v-show="active === 0"
        ref="Form1"
        :model="form"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item
          prop="phoneNumber"
          label="联系电话"
        >
          <el-input
            v-model="form.phoneNumber"
            placeholder="手机号码"
          />
        </el-form-item>
        <el-form-item
          prop="verifycode"
          label="手机验证码"
        >
          <el-input
            v-model="form.verifycode"
            placeholder="获取短信验证码"
          >
            <el-button
              slot="append"
              :class="verifycodeClass"
              :disabled="verifying"
              @click="getVerifyCodeByPhone"
            >
              {{
                verifying ? second + 's 后刷新' : '获取短信验证码'
              }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          @click="check"
        >
          下一步
        </el-button>
      </el-form>
      <el-form
        v-show="active === 1"
        ref="Form2"
        :model="form"
        :rules="formRules"
        label-width="100px"
      >
        <div class="register-type">
          <span
            :class="registerEmailType"
            @click="toggleRegisterType('email')"
          >邮箱注册<span /></span>
          <span
            :class="registerPhoneType"
            @click="toggleRegisterType('phone')"
          >手机注册<span /></span>
        </div>
        <template v-if="curRegisterType === 'email'">
          <el-form-item
            prop="email"
            label="邮箱"
          >
            <el-input
              v-model="form.email"
              placeholder="邮箱"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
          >
            <el-input
              v-model="form.password"
              placeholder="密码"
              show-password
            />
          </el-form-item>
          <el-form-item
            prop="confirmPassword"
            label="密码确认"
          >
            <el-input
              v-model="form.confirmPassword"
              placeholder="密码确认"
              show-password
            />
          </el-form-item>
          <el-form-item
            prop="verifycode"
            label="验证码"
          >
            <el-input
              v-model="form.verifycode"
              placeholder="验证码"
            >
              <el-button
                slot="append"
                :class="verifycodeClass"
                :disabled="verifying"
                @click="getVerifyCodeByPhone"
              >
                {{
                  verifying ? second + 's 后刷新' : '发送验证码'
                }}
              </el-button>
            </el-input>
          </el-form-item>
        </template>
        <template v-if="curRegisterType === 'phone'">
          <el-form-item
            prop="phoneNumber"
            label="手机号码"
          >
            <el-input
              v-model="form.phoneNumber"
              placeholder="手机号码"
            />
          </el-form-item>
          <el-form-item
            prop="verifycode"
            label="验证码"
          >
            <el-input
              v-model="form.verifycode"
              placeholder="验证码"
            >
              <el-button
                slot="append"
                :class="verifycodeClass"
                :disabled="verifying"
                @click="getVerifyCodeByPhone"
              >
                {{
                  verifying ? second + 's 后刷新' : '发送验证码'
                }}
              </el-button>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">
            <span class="default-color">我已阅读并同意</span>
            <a
              href="#"
              class="link link-blue-text"
            >服务协议</a>
            <span class="default-color">和</span>
            <a
              href="#"
              class="link link-blue-text"
            >隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-button
          type="primary"
          :disabled="!form.agree"
          @click="check"
        >
          注册
        </el-button>
      </el-form>
      <el-form
        v-show="active === 2"
        ref="Form3"
        :model="form"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item
          prop="accountName"
          label="帐户名称"
        >
          <el-input
            v-model="form.accountName"
            placeholder="请输入帐户名称"
          />
        </el-form-item>
        <el-form-item
          prop="industry"
          label="行业"
        >
          <el-select
            v-model="form.industry"
            placeholder="请选择"
          >
            <el-option
              v-for="item in industrys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">
            <span class="default-color">我已阅读并同意</span>
            <a
              href="#"
              class="link link-blue-text"
            >《服务协议》</a>
            <span class="default-color">和</span>
            <a
              href="#"
              class="link link-blue-text"
            >《隐私条款》</a>
          </el-checkbox>
        </el-form-item>
        <el-button
          type="primary"
          :disabled="!form.agree"
          @click="check"
        >
          完成
        </el-button>
      </el-form>
      <div
        v-show="active === 3"
        class="register-success"
      >
        注册成功，正在跳转...
      </div>
    </div>
  </div>
</template>

<script>
// import * as regexp from '@/const/regexp.js'
// import rules from '../common/rule.js'
export default {
  name: 'Register',
  data () {
    return {
      curRegisterType: 'email',
      active: 0,
      form: {
        phoneNumber: '',
        verifycode: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
        accountName: '',
        industry: []
      },
      formRules: {
        // email: rules.email,
        // password: rules.password,
        // confirmPassword: rules.password,
        // verifycode: rules.verifycode,
        // phoneNumber: rules.phoneNumber,
        // accountName: rules.accountName,
        // industry: rules.industry
      },
      timer: null,
      verifying: false,
      second: 60,
      industrys: []
    }
  },
  computed: {
    verifycodeClass () {
      return this.verifying ? ['register-verifyingcode'] : ['register-verifycode']
    },
    registerEmailType () {
      return this.curRegisterType === 'email' ? ['register-type-active', 'register-type-animationIn'] : ['register-type-default', 'register-type-animationOut']
    },
    registerPhoneType () {
      return this.curRegisterType === 'phone' ? ['register-type-active', 'register-type-animationIn'] : ['register-type-default', 'register-type-animationOut']
    }
  },
  methods: {
    async check () {
      let valid = true
      try {
        valid = await this.$refs[`Form${this.active + 1}`].validate()
      } catch (error) {
        valid = false
      }
      if (!valid) {
        return
      }
      // TODO: 调用 api 进行验证码判断，如果正确那么就继续下一步，不正确给出验证码错误的提示
      // const verifycodeConfirm = await axios.xxxx
      // if(!verifycodeConfirm) return
      this.resetFormData()
      this.resetTimer()
      this.formNext()
    },
    resetFormData () {
      this.form = {
        phoneNumber: '',
        verifycode: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
        accountName: ''
      }
    },
    resetTimer () {
      this.timer = null
      this.verifying = false
      this.second = 60
    },
    toggleRegisterType (type) {
      this.resetTimer()
      this.form.verifycode = ''
      this.curRegisterType = type
      this.form.agree = false
    },
    formNext () {
      this.active = this.active === 3 ? 3 : this.active + 1
      console.log(this.active, 'active')
      if (this.active === 3) {
        window.location.href = '/ad/index.html'
      }
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
    }
  }
}
</script>

<style lang="less" scoped>
  .register {
    display: inline-block;
    width: 70%;
    margin-top: 50px;

    &-success {
      text-align: center;
      font-size: 20px;
      color: #303133;
    }

    .form {
      width: 50%;
      margin: 0 auto;
      margin-top: 50px;
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

    .el-button--primary {
      width: 80%;
      margin-left: 100px;
    }

    &-default {
      color: #333;

      span {
        width: 0;
        background-color: transparent;
      }
    }

    &-active {
      color: rgb(47, 136, 255);

      span {
        background-color: rgb(47, 136, 255);
        width: 100%;
      }
    }

    &-type {
      margin-bottom: 35px;

      & > span {
        cursor: pointer;
        margin-right: 20px;
        font-size: 16px;
        position: relative;

        & > span {
          transition: width 0.5s ease;
          position: absolute;
          left: 0;
          bottom: -2px;
          display: inline-block;
          height: 2px;
        }
      }

      & > span:first-of-type {
        margin-left: 100px;
      }
    }
  }

  .default-color {
    color: #606266 !important;
  }
</style>
