<template>
  <v-app>
    <navigation/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";


export default {
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    //
  }),

  mounted() {
  this.$store.commit("LOGIN", !!localStorage.getItem("token"));
      this.$store.dispatch('loadCategories');
  this.$store.dispatch('loadPost');
},

}
</script>

<style>

</style>