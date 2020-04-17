import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/style/index.less'
import routerConfig from './router.js'
import App from './index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: routerConfig
})

/* eslint-disable-next-line no-new */
new Vue({
  router,
  el: document.getElementById('root'),
  render (h) {
    return h(App)
  }
})
