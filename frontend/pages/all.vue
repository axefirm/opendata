<template lang="html">
  <div class="">
    <!-- {{data}} -->
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({$axios, store}){
    $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/getmajordata");
    console.log(res)
    if(res.success) return {data: res.data};
  },
}
</script>

<style lang="css" scoped>
</style>
