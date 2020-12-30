/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";
import Api from "./apis/Api"
import User from "./apis/User"
import axios from 'axios'
// import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);
export default new Vuex.Store({
  state: ()=> ({
    login: false,
    user:null,
    
    categories: [],
    postList: [],
    deleteDialog: {
      visible: false,
      id:null
    },
    filterObj: {
      id: undefined,
      filter: false
    },
    EditObj: {
      mode: undefined,
      post:undefined
    },
             snackBar:{
        visible:false,
           content: "",
        timeout:2000
    },
    
             //user notifications
   notifications:[]
  }),

  getters: {
    isLoggedIn(state) {
      return state.login;
    },

    authUser(state) {
      return state.user
    },
    //get post list
    postList(state) {
          return state.filterObj.filter ? state.postList.filter((post) => post.category.id == state.filterObj.id) : state.postList;

    },
       getSnack(state) {
      return state.snackBar
    },
       
    getNotifications(state) {
        return state.notifications
      }
  },

  mutations: {
    LOGIN(state, status) {
      state.login = status;
    },

    UID(state, id) {
    state.uid = id;
    },


    AUTH_USER(state, user) {
      state.user = user;
    },

    POST_DIALOG(state, payload) {
      state.postDialog = {
        post: payload.post,
        mode:payload.mode,
        visible:payload.visible
        
      }
    },

    SET_NOTIFICATIONS(state, payload) {
      state.notifications = payload;
    },

    ADD_NOTIFICATION(state, payload) {
       state.notifications.push(payload);
    },

    SET_POST_LIST(state, payload) {
      state.postList = payload
    },

    ADD_POST(state, payload) {
      //prepend array
      if(!state.postList.includes(payload))
          state.postList = [payload,...state.postList]
    },

    
    UPDATE_POST(state, payload) {
      var index = state.postList.findIndex(post => post.id == payload.id);
      state.postList.splice(index,1,payload)
    },

       DELETE_POST(state, id) {
      state.postList = state.postList.filter(post=> post.id != id)
      
    },

    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },

        SET_DELETE_DIALOG(state, payload) {
          state.deleteDialog = {
            visible: payload.visible,
            id:payload.id
      }
    },
    UPDATE_FILTER(state, payload) {
          state.filterObj = payload
    },
    SET_EDITED_POST(sate, payload) {
      state.EditObj = {
        mode: payload.mode,
        post:payload.post
      }
    },
      SET_SNACK_BAR(state, data) {
      state.snackBar = {
        visible: data.visible,
        content: data.content,
        timeout: data.timeout

      }
    },
      
  },

  actions: {
    logout({ commit }) {
      return new Promise((resolve, reject) => {
   localStorage.removeItem('token')
   commit('LOGIN', false)
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
    },

    setUser({ commit }) {
       User.auth().then(response => {
       commit("AUTH_USER", response.data);
    });
    },

    loadCategories({commit}) {
       Api().get('/categories')
    .then((res)=> commit("SET_CATEGORIES",res.data));
    },
       loadPost({commit}) {
       Api().get('/post/all')
    .then((res)=> commit("SET_POST_LIST",res.data));
    },
    filterByCategory({ commit }, payload) {
      commit('UPDATE_FILTER',payload)
    },
    deletePost({ commit},id){
      commit('SET_DELETE_DIALOG',{
          visible:true,
          id:id
      })
    },

    //notifications
      fetchNotifications({commit}){
     User.notifications()
       .then((res) => {
        commit('SET_NOTIFICATIONS',res.data)
      })
    },
    //update Notification
  updateNotification({ commit }) {
    User.lastNotification()
     .then((res)=>{
    //  let audio =  document.getElementById('audio');
    //  audio.muted = false;
    //  audio.play();
      commit('ADD_NOTIFICATION',res.data)
     })
      }
      
      
  },
});
