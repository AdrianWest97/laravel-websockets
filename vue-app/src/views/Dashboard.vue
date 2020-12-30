<template>
  <v-container class="mx-auto  my-16" cols="12" md="8" sm="12">
    <v-row>
   <v-col cols="12">
      <v-card 
        v-show="computedPostList"
        elevation="0" outlined>
        <v-card-title class="grey darken-3 white--text">
          <div class="d-flex flex-column">
             <p>Blog Post ({{computedPostList.length}})</p>
          <create-button/>
          </div>
         
        </v-card-title>
  <v-data-table
    :headers="headers"
    item-key="title"
    :items-per-page="5"
    class="elevation-0"
   :items="computedPostList"
  >

      <template v-slot:item.created_at="{ item }">
                    {{item.created_at | moment("MMM DD, YYYY")}}
      </template>

    <template v-slot:item.title="{ item }">
                    {{item.title.length > 40 ? `${item.title.substring(0,35)}...` : item.title}}
      </template>
      
      <template v-slot:item.comments="{ item }">
                    {{item.comments.length}}
      </template>

            <template v-slot:item.isDraft="{ item }">
                           <v-chip
                            class="mr-2"
                            :color="!item.isDraft ? 'success text-white' : 'indigo text-white' "
                            >
                            {{!item.isDraft ? "Published" : "Drafted"}}
                       </v-chip>
           </template>

                   <template v-slot:item.actions="{ item }">
                <v-icon
                class="mr-2"
                 medium
                @click="editBlog(item)"
                >
                 mdi-pencil
               </v-icon>

       <v-icon
        medium
      @click="deletePost(item.id)"
      >
        mdi-delete-outline
      </v-icon>
         </template>

  </v-data-table>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CreateButton from '../components/CreateButton.vue';

export default {
  components: { CreateButton },
  data:()=>({
     firstLoad:true,
     loading:false,
    headers:[
       { text: 'Created', value: 'created_at' },
       { text: 'Category', value: 'category.name' },
       { text: 'Title', value: 'title' },
       { text: 'Comments', value: 'comments' },
       { text: 'Status', value: 'isDraft' },
               { text: 'Actions', value: 'actions', sortable: false },

    ]
  }),
  computed: {
    ...mapState({
      isLoggedIn:state => state.isLoggedIn,
      user: state => state.user
    }),
    ...mapGetters(['postList']),
    computedPostList(){
      return this.postList.filter(post => post.user.id == this.user.id)
    }
  },

  methods:{
    
    editBlog(post){
     this.$router.push({name:'NewPost', params:{mode: 'edit',post:post}})
    },
    deletePost(id){
      this.$store.dispatch('deletePost',id);
    }
  },

  mounted() {
    if(this.$store.getters.isLoggedIn){
        this.$store.dispatch('setUser');
    }
  }
};
</script>
