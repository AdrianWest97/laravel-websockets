<template>

  <!-- Navigation -->
<nav class="navbar navbar-expand-lg p-0 navbar-dark bg-dark shadow-sm fixed-top">
  <div class="container">
    <router-link to="/" class="font-weight-bold text--darken-1">West Blog's</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link" href="#">
                <span class="sr-only">(current)</span>
              </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link" href="#">Login</router-link>
        </li>

          <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/register"  class="nav-link" href="#">Register</router-link>
        </li>

     


        <li class="nav-item">
            <router-link to="/dashboard" v-if="isLoggedIn"  class="nav-link">
            <div>
            <span class="">Dashboard</span>
            </div>
       </router-link>
        </li>

        <li class="nav-item">
          <a @click="logout()" v-if="isLoggedIn"  class="nav-link" href="#">Logout</a>
        </li>

        
 
      </ul>
    </div>
  </div>
</nav>

</template>
<script>
import User from '../apis/User'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  },

     data: () => ({
    }),

  methods: {
    logout () {
      User.logout().then(() => {
        localStorage.removeItem('token')
        this.$store.commit('LOGIN', false)
        if(this.$route.path != "/"){
        this.$router.push({ path: '/' })
        }
      }).catch((err)=>{
      if(err.response.status == 401){
        localStorage.removeItem('token')
         this.$store.commit('LOGIN', false)
        if(this.$route.path != "/"){
        this.$router.push({ path: '/' })
      }
    }
      });
  },
  },

  mounted(){
  }
}
</script>

<style scoped>
.router-link-exact-active {
  transition: all 0.25s;

}




</style>
