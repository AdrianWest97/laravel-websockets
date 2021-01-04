<template>

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

        <template   
         v-for="(comment,index) in comments"
        >
      <v-list-item
        :key="comment.id"
          >
      <v-list-item-content>
        <v-list-item-title><span class="font-weight-bold">{{comment.user.name}}</span>&nbsp;&nbsp;
             <vue-moments-ago prefix="posted" suffix="ago" :date="comment.created_at" lang="en"></vue-moments-ago>
              </v-list-item-title>
        <v-list-item-subtitle>{{comment.comment}}</v-list-item-subtitle>
         <div class="d-flex flex-row" v-if="login">
          <a class="pr-2 small" @click.prevent="removeComment(comment.id)" href="#" v-if="comment.user.id == user.id">Delete</a>
          <a  class="pr-2 small" href="#">Reply</a>
         </div>
      </v-list-item-content>
    </v-list-item>
        <v-divider
            v-if="index < comments.length - 1"
            :key="index"
          ></v-divider>
        </template>
        </v-slide-y-transition>
</v-card>
     
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