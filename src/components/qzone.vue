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
                    <van-image
                      round
                      width="3rem"
                      height="3rem"
                      :src="'/static' + $store.state.user_info.img"
<!--                      :src="$store.state.user_info.img"-->
                      fit="cover"
                      style="bottom: 5px;"
                    />
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
                    <router-link :to="{name:'dev'}"> <i class="fa fa-ellipsis-h ">                            </i>
                      <span>开发手册</span> <i class="fa fa-fw "></i> </router-link>
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
        <qzoneindex/>
    </div>
    </div>
  </body>
</template>
<script>
  import { mapMutations } from 'vuex';
  import Qzoneindex from "./qzoneindex";
  export default {
    name: "qzone",
    components:{Qzoneindex},
    data(){
      return {
        'islogin': false,
        'pyq_contents': [],
        'username' : this.$store.state.user_info.username,
        'comment_content': '',
        }
    },
    methods: {
      ...mapMutations(['token_getter', 'pyq_contents_getter']),
      logout() {
        sessionStorage.removeItem('user_info');
        sessionStorage.removeItem('Authorization');
        this.islogin = false;
        this.$router.push({path:'/qzone/Anonymous'})
      },
      data_getter() {
        this.$axios({
          method: 'get',
          url: '/pyqapi/v1/anno_pyq/',
        }).then(res => {
          this.pyq_contents_getter({
            pyq_contents_query: res.data
          })
        })
      },
    },
    computed:{
    },
    created() {
      this.data_getter();
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
