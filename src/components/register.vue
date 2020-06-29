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
          <input type="text" class="form-control" id="inputEmail3"
                 placeholder="Username or email address" v-model="username" >
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-8">
          <input type="password" class="form-control" id="exampleInputPassword1"
                 placeholder="Password" v-model="password">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2" class="col-sm-2 control-label">RePassword</label>
        <div class="col-sm-8">
          <span v-show="!(re_pwd===password)" style="color: red">两次密码不一致</span>
          <input type="password" class="form-control" id="exampleInputPassword2"
                 placeholder="RePassword" v-model="re_pwd">
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputFile" class="col-sm-2 control-label">File input</label>
        <div class="col-md-2">
          <van-uploader max-count=1
                        :after-read="after_get_pic" multiple
                        v-model="file_list" >
            <div class="van-uploader">
              <div class="van-uploader__wrapper">
                <div class="van-uploader__upload">
                  <i class="van-icon van-icon-photograph van-uploader__upload-icon"><!----></i>
                  <input id="exampleInputFile" type="file" accept="image/*" class="van-uploader__input">
                </div>
              </div>
            </div>
            <p class="help-block">上传头像.</p>
          </van-uploader>
        </div>
          <label for="choose_sex" class="col-sm-2 control-label">Choose sex</label>
        <div class="col-md-6" id="choose_sex">
          <van-radio-group v-model="sex">
            <van-radio name="0">小哥哥</van-radio>
            <van-radio name="1">小姐姐</van-radio>
            <van-radio name="-1" disabled>？？？</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-8">
          <button class="btn btn-info" @click="submit_register_info">Submit</button>
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
        username:'',
        password:'',
        re_pwd:'',
        sex:'0',
        file_list:[]
      }
    },
    methods:{
      after_get_pic(file){
        console.log(file)
        console.log(this.file_list[0])
        file.status = 'uploading';
        file.message = '上传中...';
        if(!file){
          setTimeout(() => {
            file.status = 'failed';
            file.message = '上传失败';
          }, 1000);
        }else{
          file.status = 'done'
        }
      },

      submit_register_info(){
        let flag1 = this.username === '' || this.password === ''
        let flag2 = this.password !== this.re_pwd
        if(flag1) {
          alert('账号或密码不能为空');
        }
        if(flag2){
          alert('两次密码不一致')
        }
        if(!flag1 && !flag2){
          let register_info_data = new FormData()
          register_info_data.append('username',this.username)
          register_info_data.append('password',this.password)
          register_info_data.append('re_pwd',this.re_pwd)
          register_info_data.append('sex',this.sex)
          register_info_data.append('img',this.file_list[0].file, this.file_list[0].file.name)
          // register_info_data.append('img',this.file_list ? this.file_list[0].content:'')
          this.$axios({
            method: 'post',
            url: '/api/userapi/v1/register/',
            // url: '/userapi/v1/register/',
            headers:{'Content-Type':'multipart/form-data'},
            data: register_info_data
            // data: {
            //   'username': this.username,
            //   'password': this.password,
            //   're_pwd': this.re_pwd,
            //   'sex': this.sex,
            //   'img': this.file_list[0].content
            // },

          }).then(() =>{
              alert('注册成功 ！')
              // location.href = '/login/'
          }).catch(error => {
            alert(error)
          })
        }
      },
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
