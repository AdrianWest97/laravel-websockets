<template>
        <v-btn
       color="indigo text-white" 
       outlined
       :to="{name:'NewPost', params:{mode: 'add'}}"
       >Create new post <v-icon>mdi-plus</v-icon></v-btn>
</template>

<script>
export default {

}
</script>

<style>

</style>