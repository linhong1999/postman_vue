// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'
import App from './App'
import router from './router'
import store from './store'
import { Uploader, RadioGroup, Radio, Image as VanImage } from 'vant';

import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'

Vue.config.productionTip = false;
Vue.prototype.HOST = '/api';
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

Vue.use(Uploader).use(RadioGroup).use(Radio).use(VanImage)


const cpn = {
  template: `<div>我是组件 CPN</div>`,
  data() {
    return{
      msg: 'hello world'
    }
  }
}

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   // router,
//   components: { App , cpn},
//   // template: '<App/>'
// })
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    // document.title = to.meta.title
    // 当有子组件时  用 matched 匹配的 下标去取
    // 否则 会 undefined
    document.title = to.matched[0].meta.title
  }
  next()
})

// 不推荐  应该把 css 写在  App.vue
// require('./assets/css/base.css')
//1.Vue.beforeEach(function(to,form,next){}) /*在跳转之前执行*/
//
// 2.Vue.afterEach(function(to,form))/*在跳转之后判断*/
//
// 在路由跳转的时候，我们需要一些权限判断或者其他操作。这个时候就需要使用路由的钩子函数。
//
// 定义：路由钩子主要是给使用者在路由发生变化时进行一些特殊的处理而定义的函数。
//
// beforeEach函数有三个参数：
// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
// afterEach函数不用传next()函数
