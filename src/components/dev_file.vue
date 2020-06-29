<template>
  <div class="jumbotron" >
    <div style="margin-left: 300px">
      <h1>Hello, world!</h1>
      <p>-----------实现的功能有: 登录，注册，发表朋友圈，点赞，评论</p>
      <p>有权限模块 分为登录用户和匿名用户</p>
      <p>匿名用户可浏览但不能操作，必须先登录</p>
      <p>由于用户名是唯一，所以前端通过用户名进行初步校验。后端通过token进行令牌校验</p>
      <p>-----------底下的是没做的</p>
      <p>搜索功能: drf 一个filter的事情</p>
      <p>浏览记录: 前端可以用路由守卫实现，到了后端可以用中间件实现</p>
      <p>请求控制: 和上面的权限模块类似，甚至跟简单，针对单一接口(比如注册)做频率控制</p>
      <p>数据展示: 比如折线图展示，小网站比如现在这个，就放在后端数据处理完了做，大网站就放在前端处理</p>
      <p>邮件通知: celery配置，按着之前早鸟课的配置就可以了</p>
      <p>-----------虽然功能简单，但其余的都大同小异吧，做来做去都是那几个功能</p>
      <p>可能是自己经验少吧，做过最高级的一个就是监控网站实时访问情况用的kafka消息队列</p>
      <p>后期可能是先做优化吧，如果有时间的话，最后再补充功能吧</p>
      <p>最近学的有点赶，得先沉淀一下</p>
      <p><button class="btn btn-primary btn-lg" @click="go_back" role="button">Return</button></p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "dev",
    methods:{
      go_back(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
