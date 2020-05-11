import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import {
    Dialog
} from 'vant';
Vue.use(Dialog);
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
//引入静态资源
import axios from 'axios';
import Common from '../static/js/common.js';
import global_ from './components/Global.vue' //引用文件

Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
//全局配置Common方法
Vue.prototype.Common = Common;

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

