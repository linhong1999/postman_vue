<template>

  <body class="bg-white" data-bg-color="bg-white">
  <div class="king-page-box">
    <div class="king-layout1-header">
      <nav role="navigation" class="navbar navbar-default king-horizontal-nav3     f14">
        <div class="nav-container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bk-example-navbar-collapse-3">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="javascript:;">
              <img src="https://magicbox.bk.tencent.com/static_api/v3/bk/images/logo.png" alt="" class="logo"> </a>
          </div>
          <div class="collapse navbar-collapse navbar-responsive-collapse" id="bk-example-navbar-collapse-3">
            <ul class="nav navbar-nav ">
              <!--<li :class="{'bk-cur':item.active}"  v-for="item in renderData.items">-->
              <li class="bk-cur"> <a href="javascript:void(0);">首页<span></span></a> </li>
              <li> <a href="javascript:void(0);">我的空间<span></span></a> </li>
              <li> <a href="javascript:void(0);">我的访客<span></span></a> </li>
              <li> <a href="javascript:void(0);">个人信息<span></span></a> </li>
              <li> <a href="javascript:void(0);"><span></span></a> </li>
              <li> <a href="javascript:void(0);"><span></span></a> </li>
              <li> <a href="javascript:void(0);"><span></span></a> </li>
            </ul>
            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="搜索...">
              </div>
            </form>
            <ul class="nav navbar-nav navbar-left">
              <li>
                <a href="javascript:;">
                  <!--                    <img :src="require('/static' + $store.state.user_info.img)" class="avatar">-->
                  <img :src="'/static' + $store.state.user_info.img" class="avatar">
                  <span>{{username}}</span>
                </a>
              </li>
              <li v-show="islogin">
                <a href="javascript:;" @click="logout" title="退出" >
                  <span class="iconfont icon-logout"></span>
                </a>
              </li>
              <li v-show="!islogin">
                <router-link :to="{name:'login'}" title="登录">
                  <span class="iconfont icon-login"></span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="king-layout1-main clearfix" >
      <!-- sidebar start -->
      <div class="king-layout1-sidebar" style="position:fixed;width:216px;z-index: 20">
        <div class="container-fluid mb0 ">
          <div class="row">
            <div class="col-md-12"></div>
          </div>
        </div>
        <nav style="overflow:hidden;">
          <div class="king-vertical-nav9    f14">
            <div class="navbar-collapse navbar-hov">
              <ul class="nav navbar-nav side-nav">
                <li class="active">
                  <a href="javascript:void(0);"> <i class="fa fa-dashboard ">                            </i>
                    <span>首页</span> <i class="fa fa-fw "></i> </a>
                  <ul id="demo" class="collapse"> </ul>
                </li>
                <li>
                  <a href="javascript:void(0);"> <i class="fa fa-wrench ">                            </i>
                    <span>访客记录</span> <i class="fa fa-fw "></i> </a>
                  <ul id="demo" class="collapse"> </ul>
                </li>
                <li>
                  <a href="javascript:void(0);"> <i class="fa fa-edit ">                            </i>
                    <span>我的消息</span> <i class="fa fa-fw "></i> </a>
                  <ul id="demo" class="collapse"> </ul>
                </li>
                <li>
                  <a href="javascript:void(0);"> <i class="fa fa-ellipsis-h ">                            </i>
                    <span>开发手册</span> <i class="fa fa-fw "></i> </a>
                  <ul id="demo" class="collapse"> </ul>
                </li>
                <li>
                  <a href="javascript:void(0);"> <i class="fa fa-wrench ">                            </i>
                    <span>一二三四</span> <i class="fa fa-fw "></i> </a>
                  <ul id="demo" class="collapse"> </ul>
                </li>
                <li>

                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!-- sidebar end -->
      <!-- content start -->
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
    </div>
  </div>
  </body>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    name: "qzone",
    data(){
      return {
        'islogin': false,
        'pyq_contents': [],
        'username' : this.$store.state.user_info.username,
        'comment_content': '',
      }
    },
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
            url: '/api/pyqapi/v1/anno_pyq/',
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
    computed:{
    },
    created() {
      if(this.username != 'Anonymous'){
        this.islogin = true
      }else{
        this.islogin = false
      }
    }
  }
</script>

<style scoped>
  @import "https://magicbox.bk.tencent.com/static_api/v3/assets/kendoui-2015.2.624/styles/kendo.common.min.css";
  @import "https://magicbox.bk.tencent.com/static_api/v3/assets/kendoui-2015.2.624/styles/kendo.default.min.css";
  @import "https://magicbox.bk.tencent.com/static_api/v3/assets/fontawesome/css/font-awesome.css";
  @import "https://magicbox.bk.tencent.com/static_api/v3/bk/css/bk.css";
  @import "https://magicbox.bk.tencent.com/static_api/v3/bk/css/bk_pack.css";
  @import "../../static/icon/iconfont.css";

</style>
