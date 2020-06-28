import Vue from 'vue'
import Router from 'vue-router'

// 懒加载

const login = ()=> import('../components/login');
const register = ()=> import('../components/register');
const qzone = ()=> import('../components/qzone');

// 通过 Vue.use(插件)，安装插件
Vue.use(Router);

// 插件 VueRouter 对象  export default 之后
// 才能被别的文件 通过 import 引用
export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/qzone/:username',
      name: 'qzone',
      component: qzone,
    },
  ]
})
