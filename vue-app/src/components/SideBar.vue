<template>
  <v-col cols="12" md="4">
  <v-row>
    <v-col cols="12">
      <v-btn
       color="indigo" 
       large 
       outlined
       :to="{name:'NewPost', params:{mode: 'add'}}"
       >Create new post <v-icon>mdi-plus</v-icon></v-btn>
    </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Category</v-card-title>
          <v-card-text>
            <v-list>
                <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
      <v-list-item v-for="item in $store.state.categories" :key="item.id"  @click="filter(item.id)">    
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
      </v-list-item-content>
       <v-list-item-action>
         <v-badge
          bottom
          :content="item.post_count > 0 ? item.post_count : '0'"
        ></v-badge>
        </v-list-item-action>
           </v-list-item>
                </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
  </v-row>
  </v-col>
</template>


<script>
import { mapState } from 'vuex';
/* eslint-disable */

export default {
data:() =>({
  selectedItem:null,
}),
computed:{
...mapState({})
},
methods:{
  showDialog(){
    this.$store.commit('POST_DIALOG',{
      visible:true,
      mode:"add"
    })
  },
  filter(id){
   this.$store.dispatch("filterByCategory",{
     filter:true,
     id:id
   });
  }
},
created(){

}

}
</script>

<style>

</style>