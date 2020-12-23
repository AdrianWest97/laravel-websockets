<template>
   <v-row justify="center">
    <v-dialog v-model="postDialog.visible"
       scrollable max-width="800px"
      transition="slide-y-transition"
      hide-overlay
       >
       <v-form
       ref="form"
       v-model="valid"
       lazy-validation
       @submit.prevent="submit"
       >
       <v-card>
           <v-card-title>Create Post</v-card-title>
           <v-divider></v-divider>
           <v-card-text>
               <v-row>
                   <v-col cols="4">
                       <v-select
						:items="$store.state.categories.map(category => category.name)"
						v-model="form.category"
						label="Select category"
                         :rules="[v => !!v || 'Post category is required']"
						required
                        filled
						></v-select>
                   </v-col>
                     <v-col cols="12">
                         <v-text-field
                         placeholder="Enter title"
                         v-model="form.title"
                          :rules="[v => !!v || 'Enter a title']"
                         label="Post Title"
                         filled
                         required
                         >

                         </v-text-field>
                     </v-col>
                        <v-col cols="12">
                        <v-textarea
                        counter
                        rows="4"
                     v-model="form.post"
                     row-height="50"
                      :rules="[v => !!v || 'Enter details']"
                    auto-grow
                    label="Details"
                    class="mt-1"
                    filled
                    required
                        >
                        </v-textarea>
                        </v-col>
               </v-row>
           </v-card-text>
           <v-card-actions>
                <v-spacer></v-spacer>
          <v-btn
            color="primary"
            type="submit"
            :disabled="!valid"
          >
            Post
          </v-btn>
           </v-card-actions>
       </v-card>
       </v-form>
    </v-dialog>
   </v-row>
</template>

<script>
/* eslint-disable */ 

import { mapGetters } from 'vuex'
import Post from '../apis/Post'
export default {
data:() =>({
    dialog:true,
    valid: false,
    items:[
        "Laravel",
        "Node.js",
        "c#",
        "Other"
    ],
    form:{
        category:'',
        title:'',
        post:''
    }
}),

computed:{
...mapGetters(['postDialog'])
},
methods:{
    submit(){
         this.$refs.form.validate();
         if(this.valid){
            //post form
            Post.create(this.form, this.$store.state.postDialog.mode, this.$store.state.postDialog.post ? this.$store.state.postDialog.post.id : null)
            .then((res) =>{
               this.$store.commit('ADD_POST',res.data)
               this.$store.commit('POST_DIALOG',{
                   visible:false
               });
                 this.$refs.form.reset()
            });
         }
    }
}

}
</script>

<style>

</style>