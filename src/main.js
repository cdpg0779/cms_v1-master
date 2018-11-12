import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import axios from 'axios';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.prototype.$ajax = axios;
Vue.prototype.$uri = "http://180.18.30.243:2999/";
Vue.use(iView);



// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});