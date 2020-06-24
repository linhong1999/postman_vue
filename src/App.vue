<template>
  <div id="app">
    <!-- 默认渲染成 a 标签 用tag 可变成其他标签 -->
    <!-- 默认为 history.pushState 这样可以点后退 用 .replaceState 就无法后退 -->
    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/hello">hello world</router-link>
    <button @click="btnClick">按钮</button>
    <router-link :to="'/user/' + userid">用户</router-link>
    <router-link to="/profile">档案1</router-link>
    <router-link :to="{path: 'profile', query: {name:'wink',age:'18'}}">档案2</router-link>
    <!-- 放在下面就在下面显示，放在上面就在上面显示 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      userid: 'lisi'
    }
  },
  methods: {
    btnClick() {
      this.$router.push('/home')  // 跳转  可后退
      this.$router.replace('/home')  // 跳转  不可后退
      console.log('我被点击了')
    }
  }
}
</script>
<style>
  @import "./assets/css/base.css";
  /* 点击之后会有 router-link-exact-active router-link-active 的 class */
  /* 点哪个哪个就会出现 */
  .router-link-active {
    color: blue;
  }
</style>
