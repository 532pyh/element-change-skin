import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'css/base/base.less';
import 'css/base/element_theme.scss';
Vue.config.productionTip = false;

//注册element-ui组件
import element from 'element-ui';
Vue.use(element);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
