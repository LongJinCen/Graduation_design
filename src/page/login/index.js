import vue from 'vue'
import vueRouter from 'vue-router'
import '@/style/index.less'
import routerConfig from './router.js'
import App from './index.vue'

vue.use(vueRouter)
const router = new vueRouter({
    routes: routerConfig
})

new vue({
    router,
    el: document.getElementById('root'),
    render(h) {
        return h(App)
    },
})