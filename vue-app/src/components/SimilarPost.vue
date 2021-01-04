<template>
<div>
  <v-row v-if="posts">
    <v-col cols="6" lg="3" v-for="post in posts" :key="post.id">
        <v-card flat :to="{name: 'blog_details',params:{blogId: post.id}}">
            <v-card-title><span class="small">{{post.title.length > 25 ? `${post.title.substring(0,25)}...` : post.title}}</span></v-card-title>
            <v-card-subtitle>Posted by {{post.user.name}}</v-card-subtitle>
            <v-card-text>
         <v-img
        v-if="post.image"
        :src="loadImage(post.image.path)"
        :lazy-src="`https://picsum.photos/10/6`"
        aspect-ratio="1"
         max-height="100"
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
            </v-card-text>
        </v-card>
    </v-col>
  </v-row>
  <div v-if="posts.length < 1">No similar blog post</div>
</div>
</template>

<script>
export default {
data:() =>({
posts:[]
}),
methods:{
getSimilarPost(){
this.posts = this.$store.getters.postList.filter(post => post.category.id == this.categoryId && post.id != this.postId);
},
   loadImage(image){
        return `${process.env.VUE_APP_BASE_URL}/storage/${image}`
    },
},
props:{
    categoryId:{
        required:true,
        type:Number
    },
      postId:{
        required:true,
        type:Number
    }
},
mounted(){
    this.getSimilarPost();
}
}
</script>

<style>

</style>