<template>
  <div id="app">
    <!-- 放在下面就在下面显示，放在上面就在上面显示 -->
    <router-link :to="{name:'login'}"></router-link>
    <router-link :to="{name:'register'}"></router-link>
    <router-link :to="{name:'qzone'}"></router-link>
    <router-link :to="{name:'dev'}"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from "./components/login";
import Register from "./components/register";
import Qzone from "./components/qzone";
import Dev from "./components/dev_file";
export default {
  name: 'App',
  components: {Qzone, Register, Login, Dev},
  // data(){
  // },
  // methods: {
  // },

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
