import Vue from 'vue'
import '@/style/index.less'
import App from './creative.vue'

/* eslint-disable-next-line no-new */
new Vue({
  el: document.getElementById('root'),
  render (h) {
    return h(App)
  }
})
