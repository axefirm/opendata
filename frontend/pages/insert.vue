<template lang="html">
  <div class="">
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-autocomplete
              v-model="name"
              :items="classes"
              item-text="Монгол_нэр"
              return-object
            >
              <template
                  slot="selection"
                  slot-scope="data"
                >
                {{data.item.Монгол_нэр}}
              </template>
            </v-autocomplete>
          </v-flex>

          <v-flex xs12 md4 v-if="parent">

            <v-text-field
              label="Parent ID"
              type="text"
              v-for="(item, index) in parent"
              v-model="parent[index]"
            >
            </v-text-field>
            <v-btn color="success" @click="parent.push('')">Add</v-btn>
            <v-btn color="warning" @click="parent.pop();">Remove last</v-btn>

          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
              label="Child ID"
              type="text"
              v-for="(item, index) in child"
              v-model="child[index]"
            >
            </v-text-field>
            <v-btn color="success" @click="child.push('')">Add</v-btn>
            <v-btn color="warning" @click="child.pop();">Remove last</v-btn>
          </v-flex>
        </v-layout>
        {{classes}}
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, store}){
    $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/getclasses");
    if(res.success) return {classes: res.data};
  },
  data(){
    return{
      name: '',
      parent: null,
      child: ['']
    }
  }
}
</script>

<style lang="css" scoped>
</style>
