import vue from 'vue'
import App from './navigator.vue'

new vue({
    el: document.getElementById('navigator-instance'),
    render: h => h(App)
})
