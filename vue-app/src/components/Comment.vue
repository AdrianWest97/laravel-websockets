<template>
      <v-card flat v-if="$store.state.login">
        <v-card-title>Leave a comment
        </v-card-title>
         <v-card-text>
            <v-textarea
          v-model="comment"
          solo
          filled
          auto-grow
          rows="1"
          row-height="15"
          dense
          prepend-inner-icon="mdi-account-circle-outline"
          @key.enter="submit"
          placeholder="Type your comment here..."
        >
        <template v-slot:append>
        <v-btn 
        @click="submit()" 
        :loading="loading" 
        :disabled="!comment"
        icon
        color="indigo text-white">
        <v-icon>
            mdi-send
            </v-icon></v-btn>
        </template>

        </v-textarea>
       
       </v-card-text>
      </v-card>

</template>

<script>
import Comment from '../apis/Comment';
export default {
data: () =>({
loading:false,
comment:'',
}),
methods:{
    submit(){
            const data = {
                comment: this.comment,
                post_id:this.postId
            }
            Comment.Create(data)
            .then(() => {
                this.comment='';
            })
        
    }
},
props:{
    postId:{
        required:true,
    }
}
}
</script>

<style>

</style>