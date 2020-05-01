export default {
  login: {
    isLogin: '/ad/login/islogin',
    loginWithEmail: '/ad/login/email',
    loginWithPhone: '/ad/login/phone'
  },
  loginOut: '/ad/loginOut',
  getVerifycode: {
    phone: '/ad/getVerifycode/phone',
    email: '/ad/getVerifycode/email'
  },
  register: {
    phone: '/ad/register/phone',
    email: '/ad/register/email',
    info: '/ad/register/setInfo'
  },
  account: '/ad/accountInfo',
  adData: '/ad/indicators',
  promotion: {
    list: '/ad/promotion/list',
    del: '/ad/promotion/del'
  },
  creative: {
    data: '/ad/creative/data',
    upload: '/ad/creative/upload'
  }
}
