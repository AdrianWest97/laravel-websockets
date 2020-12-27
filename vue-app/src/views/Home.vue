<template>
<v-container  class="my-10" >
<v-row 
justify="center" 
      class="mb-6"
>
  <post></post>
        <v-spacer></v-spacer>

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
