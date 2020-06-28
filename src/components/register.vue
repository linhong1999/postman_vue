<template>
  <div>
    <div class="jumbotron" style="text-align: center">
      <h1>Anonymous logins</h1>
      <p>...</p>
      <p><router-link :to="quick_browse_url"><button class="btn btn-primary btn-lg">Quickly browse</button></router-link></p>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Username or email address</label>
        <div class="col-sm-8">
          <input type="email" class="form-control" id="inputEmail3" placeholder="Username or email address">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2" class="col-sm-2 control-label">RePassword</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" id="exampleInputPassword2" placeholder="RePassword">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputFile" class="col-sm-2 control-label">File input</label>
        <div class="col-sm-8">
          <input type="file" id="exampleInputFile" class="form-control">
          <p class="help-block">上传头像.</p>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-8">
          <button type="submit" class="btn btn-info">Submit</button>
          <router-link :to="{name:'login'}"><button class="btn btn-info" type="button">Sign in</button></router-link>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
    export default {
        name: "register",
      data(){
        return {
          quick_browse_url: '/qzone/Anonymous',
        }
      },
      created(){
        if(this.$store.state.user_info){
          this.quick_browse_url = '/qzone/' + this.$store.state.user_info.username
        }
      },
    }
</script>

<style scoped>

</style>
