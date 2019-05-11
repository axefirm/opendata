<template lang="html">

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
          <v-flex xs12 md4>
            <v-combobox
              v-model="school"
              :items="['ХШУИС', 'БС', 'ШУС', 'ОУХНУС', 'ХЗС']"
              label="Select a favorite activity or create a new one"
              text
              item-text="Монгол_нэр"
              multiple
              chips
            >
              <template
                slot-scope="data"
              >
                {{data.item.Монгол_нэр}}
              </template>
            </v-combobox>
            <v-btn @click="syncMajors">Sync Data</v-btn>
          </v-flex>
          <v-flex xs12 md4>
            <v-combobox
              v-for="(item, index) in selectedParent"
              v-model="selectedParent[index]"
              :items="classes"
              label="Parent Class"
              text
              item-text="Монгол_нэр"
              return-object
              multiple
              chips
            >
              <template
                slot-scope="data"
              >
                {{data.item.Монгол_нэр}}
              </template>
            </v-combobox>
            <v-btn @click="selectedParent.push([])">Add</v-btn>
            <v-btn @click="selectedParent.pop()">Pop</v-btn>
          </v-flex>
          <v-flex xs12 md4>
            <v-combobox
              v-model="selectedChild"
              :items="classes"
              label="Child Class"
              text
              item-text="Монгол_нэр"
              return-object
              multiple
              chips
            >
              <template
                slot-scope="data"
              >
                {{data.item.Монгол_нэр}}
              </template>
            </v-combobox>
          </v-flex>
          <v-flex xs12 md4>
            <v-checkbox
              v-for="(item, index) in kt"
              v-model="kt[index].checked"
              :label="item.Хөтөлбөрийн_нэр"
            ></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
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
      school: null,
      majors: null,
      kt: null,
      selectedChild: [],
      selectedParent: [[]]
    }
  },
  watch:{
    school: function(val){
      console.log(val)
    },
    majors: function(val){
      let smt = val;
      console.log(val);
      let kt = []
      for(let i = 0; i < smt.length; i ++){
        let j = 0
        for(; j < kt.length; j++){
          if(kt[j].Хөтөлбөрийн_нэр == smt[i].Хөтөлбөрийн_нэр || kt[j].Хөтөлбөрийн_нэр + " " == smt[i].Хөтөлбөрийн_нэр || kt[j].Хөтөлбөрийн_нэр == smt[i].Хөтөлбөрийн_нэр + " ") break;
        }
        if(j == kt.length) kt.push(smt[i]);
        if(i+1 == smt.length) this.kt = kt;
      }
    }
  },
  methods:{
    async syncMajors(){
      this.$axios.setToken(this.$store.state.token);
      let smt = ""
      for(let i = 0; i < this.school.length - 1; i++){
        smt += this.school[i] + ","
      }
      smt += this.school[this.school.length - 1];
      console.log(smt);
      let res = await this.$axios.$get("http://localhost:8080/getschoolmajors/" + smt)
      if(res.success) this.majors = res.data;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
