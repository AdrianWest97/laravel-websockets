/* eslint-disable */
<template>
   <v-col cols="12" md="7">
       <v-row>
  <v-col cols="12">
  <v-sheet
    class="pa-3"
    v-if="firstLoad" :loading="loading" 
  >
    <v-skeleton-loader
      class="mx-auto"
      type="card-heading,image"
    ></v-skeleton-loader>
  </v-sheet>


         </v-col>
           <v-col 
           cols="12" 
           v-for="post in postList" :key="post.id"
            v-show="!firstLoad"
            :loading="loading"
           >
               <v-card flat dense tile>
                      <v-card-title  class="dark--text">
          <span class="headline"><router-link :to="{name: 'blog_details',params:{blogId: post.id}}">{{post.title}}</router-link></span>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            left
            v-if="isLoggedIn && post.user.id == auth.user.id"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                text
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="checkAction(item.action,post.id)"                
              >
                     <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
               </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> 
        </v-card-title>
                   <v-card-subtitle>{{post.user.name}} <vue-moments-ago prefix="posted" suffix="ago" :date="post.created_at" lang="en"></vue-moments-ago>
                   </v-card-subtitle>
                   <v-card-text>
                       <v-row>
                           <v-col cols="12"  v-if="post.image != null">
    <v-img
        :src="loadImage(post.image.path)"
        :lazy-src="`https://picsum.photos/10/6`"
        aspect-ratio="1"
         max-height="250"
        class="grey lighten-2"
        fit
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
                           </v-col>
                       </v-row>
                      <div v-html="post.post.length > 202 ? `${post.post.substring(0,202)}...` : post.post"></div>
                    <v-chip
                      class="mr-2"
                      v-for="tag in post.tags[0].name.split(',')"
                      :key="tag"

                    >
                      <v-avatar
                        class="accent white--text"
                        left
                        v-text="tag.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ tag }}
                    </v-chip>
  
                   </v-card-text>
                   <!-- <v-card-actions>
                                     <v-spacer></v-spacer>
                            <v-btn 
                   elevation="0" 
                    color="indigo text-white"
                   >Read More
                   </v-btn>
                   </v-card-actions> -->
               </v-card>
           </v-col>  
           <v-col cols="12">
             <p 
             v-show="!firstLoad && postList.length == 0"
            >No data available
            </p>
           </v-col>
       </v-row>
     <delete></delete>
   </v-col>
</template>

<script>
import User from "../apis/User";
import VueMomentsAgo from 'vue-moments-ago'
import Delete from './Delete.vue';
import { mapGetters, mapState } from 'vuex';

/* eslint-disable */


export default {
        data: () => ({
          loading: false,
          firstLoad: true,
        items: [
        { title: 'Edit post',icon:'mdi-pencil',action:'edit' },
        { title: 'Delete', icon:'mdi-delete',action:'delete' },
      ],
    }),
components:{
     VueMomentsAgo,
Delete
},
computed:{
...mapGetters([
  'isLoggedIn',
  'postList'
]),
...mapState(['auth'])
},
  methods:{
    checkAction(action, id){
        if(action == 'edit'){

          this.$router.push({name:'NewPost', params:{mode: 'edit',post:this.postList.findside(post => post.id == id)}})
        }else if(action == 'delete'){
            this.deletePost(id);
        }
    },
    deletePost(id){
      this.$store.commit('SET_DELETE_DIALOG',{
          visible:true,
          id:id
      })
    },
    loadImage(image){
        return `${process.env.VUE_APP_BASE_URL}/storage/${image}`
    },
    fetchPost(){
      this.loading = true;
      this.$store.dispatch("loadPost");
          setTimeout(() => {
          if (this.firstLoad) this.firstLoad = false
          // console.log('data is loaded');
          this.loading = false;
        }, 1000);
    },

  },

mounted(){
  //broadcast new post
 window.Echo.channel('NewPostChannel')
.listen('NewPost', (e)=>{
//update post list state
      this.$store.commit('ADD_POST',e.post);

});
//broadcast delete
//update post list state
window.Echo.channel('DeleteChannel')
.listen('DeletePost', (e)=>{
this.$store.commit('DELETE_POST',e.delete_id);
})

//update a specific post
window.Echo.channel('UpdatePostChannel')
.listen('UpdatePost', (e)=>{
this.$store.commit('UPDATE_POST',e.post);
})

     this.$store.commit("LOGIN", !!localStorage.getItem("token"));
    if(this.$store.getters.isLoggedIn){
     User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data);
      //load post
    });
     }

},

created(){
  //get user
    this.fetchPost();
}

}
</script>

<style>

</style>