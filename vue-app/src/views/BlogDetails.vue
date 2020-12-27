<template>
  <v-container class="my-16">
      <v-row>
          <v-col cols="12">
              <v-sheet
               class="pa-3"
                >
    <v-skeleton-loader
      class="mx-auto"
      type="card-heading,image, paragraph"
       v-if="firstLoad" :loading="loading" 
    ></v-skeleton-loader>
  </v-sheet>

              <v-card 
              flat
               v-if="blog != null && !firstLoad"
               :loading="loading"
              >
                  <v-card-title class="headline">
          <h1 class="blog-head"><router-link :to="{name: 'blog_details',params:{blogId: blog.id}}">{{blog.title}}</router-link></h1>
                  </v-card-title>
                  <v-card-text>
                          <v-img
        v-if="blog.image != null"
        :src="loadImage(blog.image.path)"
        :lazy-src="`https://picsum.photos/10/6`"
        aspect-ratio="1"
         max-height="500"
        class="grey lighten-2 rounded"
        contain
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
      </v-img><br/>
      <div v-html="blog.post"></div>

                  </v-card-text>
                   <v-divider></v-divider>
            <post-comments :commentsArr="blog.comments"></post-comments>
              </v-card>
           
          </v-col>
        <comment :postId="$route.params.blogId"></comment>
      </v-row>
  </v-container>
</template>

<script>
import Post from '../apis/Post'
import Comment from '../components/Comment.vue';
import PostComments from '../components/PostComments.vue';
export default {
data:() =>({
blog:null,
loading: true,
firstLoad: true,
}),
components:{
Comment,
PostComments
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
                        // console.log('data is loaded');
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