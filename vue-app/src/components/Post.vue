/* eslint-disable */
<template>
   <v-col cols="12">
       <v-row>
  <v-col cols="12">
  <v-sheet
    class="pa-3"
    v-if="firstLoad" :loading="loading" 
  >
    Loading post..
  </v-sheet>


         </v-col>
           <v-col 
           cols="12" 
           v-for="post in postList" :key="post.id"
            v-show="!firstLoad"
            :loading="loading"
           >

                          <v-card  dense flat >
            <v-card-title>
          <h1 class="blog-head">
            <router-link :to="{name: 'blog_details',params:{blogId: post.id}}">{{`${post.title.length > 50 ? `${post.title.substring(0,50)}...` : post.title}`}}</router-link></h1>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            transition="slide-x-transition"
            left
            v-if="user && isLoggedIn && post.user.id == user.id"
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
  <v-col cols="12"  v-if="post.image">
    <v-img
        :src="loadImage(post.image.path)"
        :lazy-src="`https://picsum.photos/10/6`"
        aspect-ratio="1"
         max-height="600"
        class="grey lighten-2 rounded"
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
                      <div v-html="post.post.length > 202 ? `${post.post.substring(0,150)}...` : post.post"></div>
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
   </v-col>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
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
},
computed:{
...mapGetters([
  'isLoggedIn',
  'postList',
]),
...mapState(['login','user'])
},
  methods:{
    checkAction(action, id){
        if(action == 'edit'){

          this.$router.push({name:'NewPost', params:{mode: 'edit',post:this.postList.find(post => post.id == id)}})
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
this.fetchPost();
  //broadcast new post
 window.Echo.channel('NewPostChannel')
.listen('NewPost', (e)=>{
//update post list state
      this.$store.commit('ADD_POST',e.post);

});

//update a specific post
window.Echo.channel('UpdatePostChannel')
.listen('UpdatePost', (e)=>{
this.$store.commit('UPDATE_POST',e.post);
})
  

},


}
</script>

<style>

</style>