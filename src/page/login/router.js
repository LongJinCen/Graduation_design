import Forget from './forget/forget.vue'
import Login from './login/login.vue'
import Register from './register/register.vue'

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/forget',
    component: Forget
  },
  {
    path: '/register',
    component: Register
  }
]
