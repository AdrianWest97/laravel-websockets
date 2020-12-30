<template>
<div>
     <v-list-item :key="source.id">
            <template>
              <v-list-item-content>
                <v-list-item-title class="small">
                    <span class="font-weight-bold text-dark">{{source.data.comment.user.name}} commented on your post 
                        </span>
                        <vue-moments-ago
                     suffix="ago" 
                     prefix=""
                     :date="source.created_at"
                      lang="en"></vue-moments-ago>
                </v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="`${source.data.comment.comment}`"
                ></v-list-item-subtitle>

              </v-list-item-content>
            </template>
          </v-list-item>
                   <v-divider
            class="p-0 m-0"
          ></v-divider>
</div>
</template>

<script>
import VueMomentsAgo from 'vue-moments-ago'

  export default {
    name: 'item-component',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      }
    },
        components:{
        VueMomentsAgo
    },
  }
</script>

<style>

</style>