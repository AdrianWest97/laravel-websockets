<template>
  <v-row>
      <v-col cols="12" lg="8" >
      <v-card flat>
        <v-card-title>Leave a comment</v-card-title>
         <v-card-text>
             <v-form 
             ref="form"
              v-model="valid"
               lazy-validation 
               @submit.prevent="submit">
            <v-textarea
          auto-grow
          v-model="comment"
          outlined
          required
          @key.enter="submit()"
          :rules="[v => !!v || 'This field is required']" 
          rows="2"
          placeholder="Type your comment here"
        ></v-textarea>
        <v-btn 
        type="submit" 
        :loading="loading" 
        :disabled="!valid" 
        color="indigo text-white">comment</v-btn>
             </v-form>
       </v-card-text>
      </v-card>
      </v-col>
      
  </v-row>
</template>

<script>
import Comment from '../apis/Comment';
export default {
data: () =>({
valid:true,
loading:false,
comment:'',
}),
methods:{
    submit(){
        if(this.valid){
            const data = {
                comment: this.comment,
                post_id:this.postId
            }

            Comment.Create(data)
            .then((res) => {
                this.$refs.form.reset();
                console.log(res)
            })
        }
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