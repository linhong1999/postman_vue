<template>
  <div>
    <h2>i am profile</h2>
    <p>{{$route.query.name}}</p>
    <p>{{$route.query}}</p>
  </div>
</template>

<script>
  export default {
    name: "Profile"
  }
</script>

<style scoped>

</style>
