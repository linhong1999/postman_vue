import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
    user_info: sessionStorage.getItem('user_info') ?
      JSON.parse(sessionStorage.getItem('user_info')) : {'username': 'Anonymous','img': '/media/img/default.png'},
    pyq_contents: sessionStorage.getItem('pyq_contents') ?
      JSON.parse(sessionStorage.getItem('pyq_contents')) : []
  },
  mutations:{
    token_getter (state, data) {
      state.Authorization = data.token;
      state.user_info = data.user_info;
      sessionStorage.setItem('Authorization', data.token);
      sessionStorage.setItem('user_info', JSON.stringify(data.user_info));
    },
    pyq_contents_getter(state, data){
      state.pyq_contents = data.pyq_contents_query
      sessionStorage.setItem('pyq_contents', JSON.stringify(data.pyq_contents_query));
      // console.log(state.pyq_contents)
    }
  },
  actions:{},
  getters:{},
  modules:{}
})

export default store
