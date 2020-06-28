<template>
  <div>
    <div class="jumbotron" style="text-align: center">
      <h1>Anonymous logins</h1>
      <p>...</p>
      <p><router-link :to="quick_browse_url"><button class="btn btn-primary btn-lg">Quickly browse</button></router-link></p>
    </div>
    <form class="form-horizontal" v-on:submit.prevent>
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Username or email address</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" id="inputEmail3" v-model="loginData.username" placeholder="Username or email address">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" id="inputPassword3" v-model="loginData.password" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-8">
          <button type="submit" class="btn btn-info" @click="loginForm">Sign in</button>
          <router-link :to="{name:'register'}"><button class="btn btn-info" type="button">Register</button></router-link>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex';
  export default {
      name: "login",
      data(){
        return {
          quick_browse_url: '/qzone/Anonymous',
          loginData: {
            username: '',
            password: ''
          }
        }
      },
      created(){
        if(this.$store.state.user_info){
          this.quick_browse_url = '/qzone/' + this.$store.state.user_info.username
        }
      },
      methods:{
        ...mapMutations(['token_getter','pyq_contents_getter']),
        loginForm(){
          if (this.loginData.username === '' || this.loginData.password === '') {
            alert('账号或密码不能为空');
          }else{
            this.$axios({
              method: 'post',
              url: '/api/userapi/v1/login/',
              data: this.loginData
            }).then(res =>{
              this._res_data= res.data;
              this.token_getter({
                token: 'jwt ' + this._res_data.token,
                user_info: this._res_data.user_info
              });
              // this.$router.push({
              //   path: 'qzone/' + this.loginData.username,
              // });
            }).then(() =>{
              this.$axios({
                method: 'get',
                url: '/api/pyqapi/v1/anno_pyq/',
              }).then(res => {
                this.pyq_contents_getter({
                  pyq_contents_query: res.data
                })
                location.href = '/qzone/' + this.loginData.username
              });
              }).catch(error => {
              alert('账号或密码错误');
              console.log(error);
            });
          }
        }
      }
    }
</script>

<style scoped>

</style>
