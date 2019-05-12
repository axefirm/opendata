<template lang="html">
  <div class="">
    {{data}}
  </div>
</template>

<script>
export default {
  async asyncData({$axios, store}){
    $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/getmajordata");
    if(res.success) return {data: res.data};
  },
}
</script>

<style lang="css" scoped>
</style>
