<template>

  <!-- Navigation -->
<nav class="navbar navbar-expand-lg  navbar-dark primary shadow-sm fixed-top">
  <div class="container-fluid">



    <a href="#" @click="redirect()" class="font-weight-bold text-white"><h3>{{title}}</h3></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
  </button>

   <div class="collapse navbar-collapse" id="navbarResponsive">
   <ul class="navbar-nav mr-auto">
  <li  v-bind:class="{ 'nav-item': true,active:selectedItem == item.id,'font-weight-bold':selectedItem == item.id }" v-for="item in $store.state.categories" :key="item.id"  @click="filter(item.id)">
      <a href="#" class="nav-link">{{item.name}}</a>
    </li>
        </ul>

          <ul class="navbar-nav ml-auto">
            

           <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link text-white font-weight-bold" href="#">Login</router-link>
        </li>

          <li class="nav-item">
          <router-link v-if="!isLoggedIn" to="/register"  class="nav-link text-white font-weight-bold" href="#">Register</router-link>
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



        <!-- <li class="nav-item">
      <div class="nav-link">
      <notification  v-if="isLoggedIn" :id="user.id"></notification>
      </div>
        </li> -->

                <li class="nav-item">
          <span class="nav-link">
             <v-btn
             text
       color="white"
       elevation="0"
       small
       v-if="isLoggedIn"
       @click="logout()"
       >Logout <v-icon>mdi-logout</v-icon></v-btn>
          </span>
        </li>
          <li class="nav-item">
      <div class="nav-link">
     <create-button></create-button>
      </div>
        </li>

        
        </ul>


        

      </div>


    
  </div>
</nav>

</template>
<script>
import { mapGetters, mapState } from 'vuex'
import CreateButton from './CreateButton.vue'
// import Notification from './Notification.vue'
export default {
  components: { 
    // Notification,
     CreateButton 
     },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['user']),
  },

     data: () => ({
       title:process.env.VUE_APP_NAME,
         selectedItem:null,

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
  redirect(){
    this.selectedItem = null;
    this.$store.dispatch('filterByCategory',{filter:false,id:null})
    .then(()=>{
     if(this.$route.path !== '/'){
          this.$router.push('/')
        }
    });
  },
    filter(id){
      this.selectedItem = id;
   this.$store.dispatch("filterByCategory",{
     filter:true,
     id:id
   }).then(()=>{
   if(this.$route.path !== '/'){
          this.$router.push('/')
        }
   })
  }
  },




  
}
</script>