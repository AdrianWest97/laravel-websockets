<template>
        <v-btn
       color="accent"
       :to="{name:'NewPost', params:{mode: 'add'}}"
       elevation="0"
       small
       >Create new post <v-icon>mdi-plus</v-icon></v-btn>
</template>

<script>
export default {

}
</script>

<style>

</style>