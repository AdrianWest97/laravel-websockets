<template>
   <v-menu
      nudge-width="200"
      offset-y   
    >
      <template v-slot:activator="{ on, attrs }">
         <v-badge
        color="error"
        :content="selected ? selected.length :  ''"
        overlap
        :value="selected.length > 0"
      >
        <v-btn
          depressed
          icon  
          small
          v-bind="attrs"
          v-on="on"
          color="white"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      </template>
  <v-card max-width="400">
    <v-card-subtitle >Notifications</v-card-subtitle>
    <v-divider class="p-0 m-0"></v-divider>
    <v-list two-line class="p-0">
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
        multiple
      > <virtual-list style="max-height: 360px; overflow-y: auto;" 
      :data-key="'id'"
      :data-sources="getNotifications"
      :data-component="itemComponent"
    />
      </v-list-item-group>
    </v-list>
  </v-card>
    </v-menu>
</template>

<script>
import { mapGetters} from 'vuex'
import VirtualList from 'vue-virtual-scroll-list'
import commentNotification from './commentNotification.vue'

export default {
  components: { VirtualList },

  computed: {
    ...mapGetters(['getNotifications']),

    selected(){
      var arr = [];
      this.getNotifications.forEach((notification)=>{
        if(!notification.read_at){
          arr = [...arr, this.getNotifications.indexOf(notification)]
        }
      })
      return arr;
    }
  },

     data: () => ({
       title:process.env.VUE_APP_NAME,
       itemComponent: commentNotification,

    }),
props:{
    id:{
        type:Number,
        required:true
    },
},
mounted(){
 this.$store.dispatch('fetchNotifications');
    //hack
    window.Echo.private(`App.User.${this.id}`)
    .notification(() => {
      this.$store.dispatch('updateNotification');
    });


}


  
}
</script>

<style>

</style>