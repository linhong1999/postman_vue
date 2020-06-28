<template>
  <div class="king-content-wrap">
    <div class="king-layout1-content" style="margin-left: 30px;">
      <div class="container-fluid mb0 ">
        <div class="row">
          <div class="col-md-12"></div>
        </div>
      </div>
      <div class="king-layout1-content" style="margin-left: 216px;">
        <ul class="king-timeline" v-for="(value, key) in $store.state.pyq_contents">
          <li class="time-label" >
            <span class="king-bg-blue">{{key}}</span>
          </li>
          <li v-for="(item,index) of value">
            <img :src="'/static/media/' + item.user_img" class="avatar"/>
            {{item.username}} {{item.create_time}}
            <div class="king-timeline-item">
              <h3 class="king-timeline-header">
                {{item.content}}
                <br>
                <i class="iconfont icon-dianzan" :style="wink_status(item.winks)" @click="update_wink_status(item.id)" style="cursor:pointer;"></i>
                <i class="iconfont icon-pinglun" style="cursor:pointer;"></i>({{item.comments.length}})
              </h3>
              <span style="color: black;" v-show="item.winks.length === 0 ? false:true">{{item.winks.join(' , ')}}共{{item.winks.length}}人等觉得赞 <i class="iconfont icon-dianzan" style="color: blue"/></span>
              <ul v-for="comment_obj of item.comments">
                <li>
                  <div class="king-timeline-body">
                    <img :src="'/static/media/' + comment_obj.user_img" class="avatar"/>
                    {{comment_obj.username}} : {{comment_obj.comment}}
                    {{comment_obj.create_time}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="row" >
              <div  class="col-xs-6 col-md-4"></div>
              <div  class="col-xs-12 col-sm-6 col-md-8">
                <form class="navbar-form navbar-left" role="search" v-on:submit.prevent>
                  <div class="form-group">
                    <input type="text" class="form-control" style="width: 350px" ref="inputValue" placeholder="评论">
                  </div>
                  <button class="btn btn-default" @click="submit_comment(item.id, index)">Submit</button>
                </form>
              </div>

            </div>

          </li>
        </ul>
      </div>
    </div>
    <!-- content end -->
  </div>

</template>

<script>
  export default {
    name: "myzone",
    methods:{
      ...mapMutations(['pyq_contents_getter']),
      submit_comment(pyq_obj_id, index){
        this.$axios({
          method: 'post',
          url: '/api/pyqapi/v1/comment_operate/' + pyq_obj_id + '/',
          headers:{
            'Authorization': this.$store.state.Authorization
          },
          data:{
            'comment': this.$refs.inputValue[index].value
          }
        }).then(() =>{
          this.$axios({
            method: 'get',
            url: '/api/v1/private_pyq_zone/'+ this.username + '/',
          }).then(res => {
            this.pyq_contents_getter({
              pyq_contents_query: res.data
            })
          })
        })
      },
      logout(){
        sessionStorage.removeItem('user_info');
        sessionStorage.removeItem('Authorization');
        this.islogin = false;
        location.href = '/qzone/Anonymous'
        // this.$axios({
        //   method: 'post',
        //   url: '/api/userapi/v1/logout/',
        //   headers:{
        //     'Authorization': this.$store.state.Authorization
        //   },
        // })
      },
      wink_status(wink_list){
        let username = this.username;
        for (let wink_name of wink_list){
          if(username === wink_name){
            return 'color:blue'
          }
        }
        return ''
      },
      update_wink_status(pyq_obj_id){
        this.$axios({
          method: 'post',
          url: '/api/pyqapi/v1/pyq_operate/' + this.username + '/',
          headers:{
            'Authorization': this.$store.state.Authorization
          },
          data:{
            'pyq_obj_id':pyq_obj_id
          }
        }).catch(error =>{
          alert('login first')
          location.href = '/login'
        }).then(() =>{
          this.$axios({
            method: 'get',
            url: '/api/pyqapi/v1/anno_pyq/',
          }).then(res => {
            this.pyq_contents_getter({
              pyq_contents_query: res.data
            })
          })
        })
      }
    },

  }
</script>

<style scoped>

</style>
