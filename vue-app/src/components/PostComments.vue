<template>
  <v-row>
      <v-col cols="12" lg="8" >
      <v-card flat>
        <v-card-title>Comments</v-card-title>
        <v-card-subtitle>{{comments.length}} comment</v-card-subtitle>
         <v-card-text>
        <v-list-item
         two-line class="m-0"
         v-for="comment in comments"
         :key="comment.id"
          >
      <v-list-item-content>
        <v-list-item-title>{{comment.user.name}} <vue-moments-ago prefix="posted" suffix="ago" :date="comment.created_at" lang="en"></vue-moments-ago> </v-list-item-title>
        <v-list-item-subtitle>{{comment.comment}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
         </v-card-text>
      </v-card>
      </v-col>
  </v-row>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

export default {    
data:() =>({
    comments:[],
}),
components:{
    VueMomentsAgo
},
methods:{
},
props:{
commentsArr:{
    required:true,
    type:Array
}
},
mounted(){
 this.comments = this.commentsArr
 window.Echo.channel('newCommentChannel')
.listen('addComment', (e)=>{
//update post list state
    this.comments = [...this.comments, e.comment]
});
}
}
</script>

<style>

</style>