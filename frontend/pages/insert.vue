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
            <v-btn color="success" @click="getMajor">Get Related Majors</v-btn>
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
            <div class="" v-for="(item,index) in majors">
              <v-select
                :items="[4, 3, 2, 1]"
                v-model="majors[index].importancy"
                :label="item.Хөтөлбөрийн_монгол_нэр + ' / ' + item.Суралцах_хэлбэр + ' / ' + item.Академик_түвшин"
              ></v-select>
            </div>
          </v-flex>

          <v-flex xs12 md4>
            <v-btn color="success" @click="sendClass">Send</v-btn>
          </v-flex>
        </v-layout>
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
      selectedParent: [[]],
      selectedChild: [],
      parent: [],
      child: [],
      majors: null
    }
  },
  watch:{
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
    }
  },
  methods:{
    async getMajor(){
      this.$axios.setToken(this.$store.state.token);
      let res = await this.$axios.$get("http://localhost:8080/getmajors/" + this.name.Хичээлийн_индекс);
      if(res.success) this.majors = res.data;
      console.log(res);
    },
    async sendClass(){
      this.$axios.setToken(this.$store.state.token);
      let data = this.name;
      console.log(data)
      data.parent =  this.parent;
      data.child = this.child;
      data.majors = this.majors;
      console.log(data)
      let res = await this.$axios.$post("http://localhost:8080/insertClass",data)
      console.log(res)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
