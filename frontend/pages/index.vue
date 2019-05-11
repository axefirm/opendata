<template lang="html">
  <v-layout class="container">
    <nuxt-link to="/login" class="text item">Login</nuxt-link>
    <nuxt-link to="/signup" class="text item">Signup</nuxt-link>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
  .text{
    text-decoration: none;
    color: black;
    font-size: 28px;
  }
  .item{
    background-color: cyan;
    float: left;
    border: 1px;
  }
</style>
