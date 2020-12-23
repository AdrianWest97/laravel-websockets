<template>
  <v-app>
    <navigation/>
    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',

  components: {
    Navigation,
  },

  data: () => ({
    //
  }),

    mounted() {
    this.$store.commit("LOGIN", !!localStorage.getItem("token"));
  window.Echo.channel('NewPostChannel')
.listen('NewPost', (e)=>{
//update post list state
this.$store.commit('ADD_POST',e.post);
});

  window.Echo.channel('DeleteChannel')
.listen('DeletePost', (e)=>{
//update post list state
this.$store.commit('DELETE_POST',e.delete_id);
})
  },

  created(){
  this.$store.dispatch('loadCategories');
  this.$store.dispatch('loadPost');

  }

}
</script>
