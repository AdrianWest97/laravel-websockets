<template>

  <!-- Navigation -->
<nav class="navbar navbar-expand-lg p-lg-0 navbar-dark primary shadow-sm fixed-top">
  <div class="container">
    <router-link to="/" class="font-weight-bold text-white"><h3>{{title}}</h3></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link text-white font-weight-bold" href="#">
                <span class="sr-only">(current)</span>
              </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link text-white font-weight-bold" href="#">Login</router-link>
        </li>

          <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/register"  class="nav-link text-white font-weight-bold" href="#">Register</router-link>
        </li>

     


        <li class="nav-item">
          <a @click="logout()" v-if="isLoggedIn"  class="nav-link text-white font-weight-bold" href="#">Logout</a>
        </li>

        <li class="nav-item">
          <span class="nav-link">
          <v-btn
          depressed
          color="white"
          icon  
          small  
          to="/dashboard" 
          v-if="isLoggedIn"      
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
          </span>
        </li>

        <li class="nav-item">
       

      <div class="nav-link">
      <notification v-if="user" :id="user.id"></notification>
     <!-- <audio id="audio" src="../assets/sound/audio.mp3" muted="muted" autoplay></audio> -->
      </div>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Notification from './Notification.vue'
export default {
  components: { Notification },
  computed: {
    ...mapGetters(['isLoggedIn','getNotifications']),
    ...mapState(['user']),
  },

     data: () => ({
       title:process.env.VUE_APP_NAME,
    }),

  methods: {
    logout () {
      this.$store.dispatch('logout')
      .then(()=>{
        if(this.$route.path !== '/'){
          this.$router.push('/')
        }
      })
  },
  },




  
}
</script>