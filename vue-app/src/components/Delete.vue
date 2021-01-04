<template>
  <v-row justify="center">
    <v-dialog v-model="deleteDialog.visible"
       overlay-color="#8c95a6"
              scrollable max-width="290"
      transition="slide-y-transition"
       >
       <v-card>
           <v-card-title>
               <p>Are you sure you want to delete?</p>
           </v-card-title>
           <v-card-actions>
            <v-spacer></v-spacer>
               <v-btn
               color="primary"
               text
               @click="confirm()"
               :loading="loading"
               >
                   Delete
               </v-btn>

               <v-btn
              color="primary"
               text
               @click="cancel()"
               >
                   Cancel
               </v-btn>
           </v-card-actions>
       </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import { mapState } from 'vuex'
import Post from '../apis/Post'
export default {
data:() =>({
    loading:false
}),
computed:{
    ...mapState(['deleteDialog'])
},
methods:{
    cancel(){
            this.$store.commit('SET_DELETE_DIALOG',{
                visible:false,
                id:null
            });
    },
    confirm(){
        this.loading = !this.loading
        Post.delete(this.$store.state.deleteDialog.id)
    .then(()=>{
            this.$store.commit('SET_DELETE_DIALOG',{
                visible:false,
                id:null
            });
           this.$store.state.postList = this.$store.state.postList.filter(post=> post.id != this.deleteDialog.id);
           this.loading = !this.loading
        })
    }
},
mounted(){
    window.Echo.channel('DeleteChannel')
.listen('DeletePost', (e)=>{
this.$store.commit('DELETE_POST',e.delete_id);
})
}
}
</script>

<style>

</style>