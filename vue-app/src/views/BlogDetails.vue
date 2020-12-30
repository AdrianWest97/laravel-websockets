<template>
  <v-container class="my-16">
    <v-row>
       <v-col cols="12">
         <v-sheet
        class="pa-3"
          v-if="firstLoad"
       >
    <v-skeleton-loader
      class="mx-auto"
      type="card-heading,image, paragraph"
      :loading="loading" 
    ></v-skeleton-loader>
  </v-sheet>
  </v-col>
    </v-row>

<div  v-if="blog != null && !firstLoad"
       :loading="loading"
       >
      <v-row>
          <v-col cols="12">
              <v-card 
              flat        
              >

                  <v-card-title class="headline">
               <h1 class="blog-head"><router-link :to="{name: 'blog_details',params:{blogId: blog.id}}">{{blog.title}}</router-link></h1>
                  </v-card-title>
                      <v-card-subtitle>By: {{blog.user.name}}
                       <vue-moments-ago prefix="posted" suffix="ago" :date="blog.created_at" lang="en"></vue-moments-ago>
                  </v-card-subtitle>
                  <v-card-text>
                          <v-img
        v-if="blog.image != null"
        :src="loadImage(blog.image.path)"
        :lazy-src="`https://picsum.photos/10/6`"
        aspect-ratio="1"
         max-height="600"
        class="grey lighten-2 rounded"
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
      <div v-html="blog.post"></div>

   <v-chip
                      class="mr-2"
                      v-for="tag in blog.tags[0].name.split(',')"
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
              </v-card>
          </v-col>
      </v-row>
      <v-divider></v-divider>
      <comment :postId="$route.params.blogId"></comment>
     <post-comments :commentsArr="blog.comments"></post-comments>
</div>
  </v-container>
</template>

<script>
import Post from '../apis/Post'
import Comment from '../components/Comment.vue';
import PostComments from '../components/PostComments.vue';
import VueMomentsAgo from 'vue-moments-ago'

export default {
data:() =>({
blog:null,
loading: true,
firstLoad: true,
}),
components:{
Comment,
PostComments,
VueMomentsAgo
},
methods:{
  fetchBlog(){
       this.loading = true;
        if(this.$route.params.blogId != null){
            //fetch post by ID
            Post.ById(this.$route.params.blogId)
            .then((res)=>{
                        this.blog = res.data;
                          setTimeout(() => {
                        if (this.firstLoad) this.firstLoad = false
                        this.loading = false;
                        }, 1000);
            })

        }
    },
        loadImage(image){
        return `${process.env.VUE_APP_BASE_URL}/storage/${image}`
    },
},
created(){
    this.fetchBlog();
}
}
</script>

<style>

</style>