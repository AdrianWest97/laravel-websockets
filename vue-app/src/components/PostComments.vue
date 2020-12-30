<template>
  <v-row>
      <v-col cols="12" >
      <v-card flat>
        <v-card-title>Comments</v-card-title>
        <v-card-subtitle>
            <v-chip
            color="accent"
            small
            >
                {{comments.length}} comments
            </v-chip>
        </v-card-subtitle>
        
    <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
      
        <v-list-item
         three-line
         v-for="comment in comments"
         :key="comment.id"
          >
      <v-list-item-content>
        <v-list-item-title>{{comment.user.name}} <vue-moments-ago prefix="posted" suffix="ago" :date="comment.created_at" lang="en"></vue-moments-ago> </v-list-item-title>
        <v-list-item-subtitle>{{comment.comment}}</v-list-item-subtitle>
         <div class="d-flex flex-row" v-if="login">
          <a class="pr-2" @click.prevent="removeComment(comment.id)" href="#" v-if="comment.user.id == user.id">Delete</a>
          <a  class="pr-2" href="#">Reply</a>
      </div>
      </v-list-item-content>
     
    </v-list-item>
    </v-slide-y-transition>
      </v-card>
      </v-col>
  </v-row>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'
import { mapState } from 'vuex';
import Comment from '../apis/Comment'

export default {    
data:() =>({
    comments:[],
}),
components:{
    VueMomentsAgo
},
props:{
commentsArr:{
    required:true,
    type:Array
}
},
computed:{
    ...mapState(['login','user'])
},
methods:{
removeComment(id){
    Comment.delete(id)
    .then(()=>{ })
},

},
mounted(){
 this.comments = this.commentsArr
 //listen for a new comment
 window.Echo.channel('newCommentChannel')
.listen('addComment', (e)=>{
//update post list state
    this.comments = [...this.comments, e.comment]
});

//listen when a comment has been deleted
window.Echo.channel('comment-delete-channel')
.listen('RemoveComment', (e) =>{
    this.comments = this.comments.filter(comment => comment.id != e.id);
})
}
}
</script>

<style>

</style>