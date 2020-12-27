/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";
import Api from "./apis/Api"
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      login: false,
      user: [],
    },

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
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.auth.login;
    },

    //get post list
    postList(state) {
      // console.log(state.filterObj.filter)
          return state.filterObj.filter ? state.postList.filter((post) => post.category.id == state.filterObj.id) : state.postList;

    }
  },

  mutations: {
    LOGIN(state, status) {
      state.auth.login = status;
      state.auth.user = [];
    },

    AUTH_USER(state, user) {
      state.auth.user = user;
    },

    POST_DIALOG(state, payload) {
      state.postDialog = {
        post: payload.post,
        mode:payload.mode,
        visible:payload.visible
        
      }
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
    }
  },

  actions: {
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
  },
});
