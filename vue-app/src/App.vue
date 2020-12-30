<template>
  <v-app>
    <navigation/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <snack-bar></snack-bar>
    <delete></delete>
  </v-app>
</template>

<script>
import Delete from './components/Delete.vue';
import Navigation from "./components/Navigation.vue";
import SnackBar from './components/SnackBar.vue';

export default {
  name: 'App',

  components: {
    Navigation,
    SnackBar,
    Delete
  },

  data: () => ({
    //
  }),

  mounted() {
    //check if token exits and login usr
       var token = !!localStorage.getItem("token");
       this.$store.commit("LOGIN", token);


       if(token){
        this.$store.dispatch('setUser');   
       }
    

  this.$store.dispatch('loadCategories');
  this.$store.dispatch('loadPost');
},
}
</script>

<style>

</style>