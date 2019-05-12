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
            <v-select
              :items="[4, 3, 2, 1]"
              v-model="rate"
              label="Chuhal baidal"
            >

            </v-select>
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
          {{selected}}
          <v-flex xs12 md4>
            <v-checkbox
              v-for="(item, index) in kt"
              v-model="item.checked"
              :label="item.Хөтөлбөрийн_монгол_нэр"
            ></v-checkbox>
          </v-flex>

          <v-flex xs12 md4>
            <v-btn @click="sendClass()">send</v-btn>
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
      selectedParent: [[]],
      child: null,
      parent: null,
      rate: null,
      selected: []
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
          if(kt[j].Хөтөлбөрийн_монгол_нэр == smt[i].Хөтөлбөрийн_монгол_нэр || kt[j].Хөтөлбөрийн_монгол_нэр + " " == smt[i].Хөтөлбөрийн_монгол_нэр || kt[j].Хөтөлбөрийн_монгол_нэр == smt[i].Хөтөлбөрийн_монгол_нэр + " ") break;
        }
        if(j == kt.length) kt.push(smt[i]);
        if(i+1 == smt.length) this.kt = kt;
      }
    },
    selectedChild: function(val){
      console.log(val)
      this.child = []
      for(let i = 0; i < val.length; i++){
        this.child.push(this.selectedChild[i].Хичээлийн_индекс)
        console.log(this.child)
      }
    },
    selectedParent: function(val){
      console.log(val)
      this.parent = []
      for(let i = 0; i < val.length; i++){
        let tmp = [];
        for(let j = 0; j < val[i].length; j++){
          tmp.push(val[i][j].Хичээлийн_индекс)

        }
        this.parent.push(tmp);
        console.log(this.parent)
      }
    },
    kt(val){
      this.selected = [];
      for(let i = 0; i < val.length; i++){
        let data = val[i];
        data.importancy = this.rate;
        if(val[i].checked == true) this.selected.push(data);
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
      // console.log(smt);
      let res = await this.$axios.$get("http://localhost:8080/getschoolmajors/" + smt)
      if(res.success) this.majors = res.data;
    },
    async sendClass(){
      this.$axios.setToken(this.$store.state.token);
      let data = this.name;
      // console.log(data)
      data.parent =  this.parent;
      data.child = this.child;
      data.majors = this.selected;
      console.log(data)
      let res = await this.$axios.$post("http://localhost:8080/insertClass",data)
      console.log(res)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
