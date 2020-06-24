import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
// import Home from '../components/Home'
// import User from '../components/User'

// 懒加载
const Home = ()=> import('../components/Home')
const HomeNews = ()=> import('../components/HomeNews')
const HelloWorld = ()=> import('../components/HelloWorld')
const User = ()=> import('../components/User')
const Profile = ()=> import('../components/Profile')

// 通过 Vue.use(插件)，安装插件
Vue.use(Router)

// 插件 VueRouter 对象  export default 之后
// 才能被别的文件 通过 import 引用
export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      // redirect: '/home',
      // component: Home,
      component: ()=> import('../components/Home'), // 这样上面就不用写了
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        title: 'hello world'
      }
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: 'news',
          component: HomeNews,
          meta:{
            title: '新闻'
          }
        }
      ],
      meta:{
        title: '首页'
      }
    },
    {
      path: '/user/:userid',
      component: User
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
})
