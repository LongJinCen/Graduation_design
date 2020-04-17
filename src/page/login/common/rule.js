import * as regexp from '@/const/regexp.js'
export default {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { pattern: regexp.email, message: '邮箱格式不正确', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 0, max: 20, message: '长度在 20 个字符以内', trigger: 'blur' }],
  verifycode: [{ required: true, message: '请输入验证码', trigger: 'blur' }, { len: 4, message: '手机验证码为4位，请检查', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: regexp.phoneNumber, message: '手机号格式不正确', trigger: 'blur' }],
  industry: [{ required: true, message: '请选择行业', trigger: 'blur' }],
  accountName: [{ required: true, message: '请输入帐户昵称', trigger: 'blur' }]
}
