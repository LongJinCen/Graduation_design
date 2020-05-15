export default {
  user: {
    loginWithEmail: '/ad/user/login_email',
    loginWithPhone: '/ad/user/login_phone',
    loginOut: '/ad/user/login_out',
    registerWithPhone: '/ad/user/register/phone',
    registerWithEmail: '/ad/user/register/email',
    setInfo: '/ad/user/register/setInfo',
    account: '/ad/user/Info'
  },
  data: {
    getIndicators: '/ad/data/indicators'
  },
  verify: {
    phone: '/ad/verify/phonecode',
    email: '/ad/verify/emailcode'
  },
  promotion: {
    list: '/ad/promotion/list',
    del: '/ad/promotion/del'
  },
  creative: {
    data: '/ad/creative/data',
    upload: '/ad/creative/upload',
    create: '/ad/creative/create'
  }
}
