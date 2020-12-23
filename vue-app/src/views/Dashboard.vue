<template>
  <v-container class="mx-auto  my-16" cols="12" md="8" sm="12">
    <v-row>
      <v-col cols="12" class="my-5">
       <v-sheet  v-if="firstLoad" :loading="loading">
        <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
         </v-sheet>
      </v-col>
            <v-col cols="12">
      <v-card 
        v-show="postList && !firstLoad"
      elevation="0" outlined>
        <v-card-title>
          Blog Post ({{postList.length}})
        </v-card-title>
  <v-data-table
    :headers="headers"
    item-key="title"
    :items-per-page="5"
    class="elevation-0"
   :items="postList"
  >

      <template v-slot:item.created_at="{ item }">
                    {{item.created_at | moment("MMM DD, YYYY")}}
      </template>

            <template v-slot:item.isDraft="{ item }">
                           <v-chip
                            class="mr-2"
                            :color="item ? 'success' : 'indigo' "
                            >
                            {{item ? "Published" : "Drafted"}}
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
      @click="deleteItem(item)"
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
import User from "../apis/User";
import { mapState } from "vuex";

export default {
  data:()=>({
     firstLoad:true,
     loading:false,
     postList:[],
    headers:[
       { text: 'Created', value: 'created_at' },
       { text: 'Category', value: 'category.name' },
       { text: 'Title', value: 'title' },
       { text: 'Status', value: 'isDraft' },
               { text: 'Actions', value: 'actions', sortable: false },

    ]
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },

  methods:{
    fetchPost(){
      this.loading = true
      User.post()
      .then((res)=>{
        this.postList = res.data
           setTimeout(() => {
          if (this.firstLoad) this.firstLoad = false
          this.loading = false;
        }, 1000);
      })
    },
    editBlog(post){
     this.$router.push({name:'NewPost', params:{mode: 'edit',post:post}})
    }
  },

  mounted() {
    User.auth().then(response => {
      this.$store.commit("AUTH_USER", response.data);
    });
    this.fetchPost();
  }
};
</script>
