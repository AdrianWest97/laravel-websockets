<template>
<v-container class="my-10" >
 <v-row class="justify-content-center">
  <post></post>
  <side-bar></side-bar>
 </v-row>
</v-container>
</template>

<script>
import Post from '../components/Post.vue';
import SideBar from '../components/SideBar.vue';
export default {
  components: { Post, SideBar },

}
</script>
