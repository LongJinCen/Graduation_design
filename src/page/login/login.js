import vue from 'vue'
import '@/style/index.less'
import App from './login.vue'

new vue({
    el: document.getElementById('root'),
    render: h => h(App)
})
