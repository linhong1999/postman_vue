<template>
  <div class="king-content-wrap">
    <div class="king-layout1-content" style="margin-left: 30px;">
      <div class="container-fluid mb0 ">
        <div class="row">
          <div class="col-md-4" style="width: 216px"></div>
          <div class="col-md-8">
            <form class="navbar-form navbar-left" role="search" v-on:submit.prevent>
              <textarea class="form-control" rows="3"
                        style="margin-top:20px;width: 800px"
                        v-model="content"></textarea>
              <button class="btn btn-default"
                      style="margin-top:20px;height: 62.4px"
                      @click="submit_pyq">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div class="king-layout1-content" style="margin-left: 216px;">
        <ul class="king-timeline" v-for="(value, key) in $store.state.pyq_contents">
          <li class="time-label" >
            <span class="king-bg-blue">{{key}}</span>
          </li>
          <li v-for="(item,index) of value">
            <div class="row">
              <div class="col-md-1" style="width: 4%">
                <van-image
                round
                width="5rem"
                height="5rem"
                :src="'/static/media/' + item.user_img"
                fit="cover"
                />
              </div>
              <div class="col-md-4" style="height: 50px;top: 17px">
                {{item.username}}&nbsp&nbsp&nbsp发表于:&nbsp&nbsp&nbsp{{dateFormat(item.create_time)}}
              </div>

            </div>

<!--            <img :src="'/static/media/' + item.user_img" class="avatar"/>-->
            <div class="king-timeline-item">
              <h3 class="king-timeline-header">
                {{item.content}}
                <br>
                <i class="iconfont icon-dianzan" :style="wink_status(item.winks)" @click="update_wink_status(item.id)" style="cursor:pointer;"></i>
                <i class="iconfont icon-pinglun" title="评论数" style="cursor:pointer;"></i>({{item.comments.length}})
              </h3>
              <span style="color: black;" v-show="item.winks.length === 0 ? false:true">{{item.winks.join(' , ')}}共{{item.winks.length}}人等觉得赞 <i class="iconfont icon-dianzan" style="color: blue"/></span>
              <ul v-for="comment_obj of item.comments">
                <li>

                  <div class="king-timeline-body">
                    <div class="row">
                      <div class="col-md-1" style="width: 4%">
                        <van-image
                          round
                          width="4rem"
                          height="4rem"
                          :src="'/static/media/' + item.user_img"
                          fit="cover"
                        />
                      </div>
                      <div class="col-md-4" style="height: 40px;top: 12px">
                        {{comment_obj.username}} : {{comment_obj.comment}}
                        <button style="font-size: 3px;display: none"
                                v-show="comment_obj.username === username"
                        @click="del_comment(comment_obj.username, item.id, comment_obj.id)">删除</button>
                      </div>
                        {{dateFormat(comment_obj.create_time)}}
                      </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="row" >
              <div  class="col-xs-6 col-md-4" style="width: 4%"></div>
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
  import { mapMutations } from 'vuex';
  export default {
    name: "qzoneindex",
    data() {
      return {  // 父子通信，双向绑定
        username: this.$parent.username,
        content: '',
      }
    },
    methods:{
      ...mapMutations(['pyq_contents_getter']),
      dateFormat(date){
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      submit_pyq(){
        this.$axios({
          method: 'post',
          url: '/api/pyqapi/v1/pyq_operate/',
          headers:{
            'Authorization': this.$store.state.Authorization
          },
          data:{
            'content': this.content
          }
        }).then(() =>{
          this.content = ''
          this.$axios({
            method: 'get',
            url: '/api/pyqapi/v1/anno_pyq/',
          }).then(res => {
            this.pyq_contents_getter({
              pyq_contents_query: res.data
            })
          }).then(() => {
            alert('发表成功')
          })
        })
      },
      del_comment(comment_username, pyq_obj_id, comment_obj_id){
        if(comment_username !== this.username){
          alert('没权限删除别人的')
        }else{
          this.$axios({
            'method': 'delete',
            headers:{
              'Authorization': this.$store.state.Authorization
            },
            'url': '/api/pyqapi/v1/comment_operate/' + pyq_obj_id + '/' + comment_obj_id
          }).then(() => {
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
          this.$refs.inputValue[index].value = ''
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
  @import "../../static/icon/iconfont.css";
</style>
