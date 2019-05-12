<template lang="html">
  <div style="font-size: 32px">
    <div class="" v-for="item in data">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data(){
    return{

    }
  },
  async asyncData({$axios, store}){
    $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/getmajordata");
    console.log(res)
    let list = [];
    for(let i = 0; i < res.data.length; i++){
      let j;
      for(j = 0; j < list.lenght; j++){
        if(list[j] == res.data[i]) break;
      }
      if(list.length == 0 || j == list.length) list.push(res.data[i]);
    }
    if(res.success) return {data: res.data, list: list};
  },
  watch:{
    data: function(val){
      console.log("HHH")
    }
  },
  // mounted({app}){
  //   let tmp = [];
  //   this.data.forEach(async function(item){
  //     app.$axios.setToken(store.state.token);
  //     let i;
  //     for(i = 0; i < tmp.length; i++) if(tmp[i] == item) break;
  //     if(i == tmp.length){
  //       let res = await app.$axios.$get("http://localhost:8080/getclass/"+item);
  //     }
  //     if(res){
  //       this.list.push(res);
  //     }
  //   })
  // }
}
</script>

<style lang="css" scoped>
</style>
