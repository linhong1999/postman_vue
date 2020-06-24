<template>
  <div>
    <h2>i am home page</h2>
    <router-link to="/home/news">新闻</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style scoped>

</style>
