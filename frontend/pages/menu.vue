<template lang="html">
  <div class="container">
    <div class="header">
      <div class="nav">
        <ul>
        <li><img src="~/assets/menu/kt.png" alt="" class="logo"></li>
        <li><nuxt-link class="link text" to="/next">Дараа улирал</nuxt-link></li>
        <li><nuxt-link class="link text" to="/all"> Бүх улирал</nuxt-link></li>
        </ul>
      </div>
    </div>
    <v-form>
      <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <v-select
        :items="schools"
        label="Салбар сургууль"
        outline
        v-model="yoschool"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
              v-model="firstname"
              label="First name"
              required
            ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="lastname"
            label="Last name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
              <v-autocomplete
                label="major"
                v-model="major"
                :items="kt"
                v-if="kt"
              >
                <template slot="item" slot-scope="data">
                  {{ data.item.Хөтөлбөрийн_монгол_нэр }} - {{ data.item.Академик_түвшин }} - {{data.item.Суралцах_хэлбэр}}
                </template>
                <template slot="selection" slot-scope="data">
                  {{ data.item.Хөтөлбөрийн_монгол_нэр }} - {{ data.item.Академик_түвшин }} - {{data.item.Суралцах_хэлбэр}}
                </template>
              </v-autocomplete>
        </v-flex>
        <v-flex xs12 sm6 md8>

            <v-combobox
              v-model="pickedclasses"
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

        <v-flex xs12 sm6 md4>
          <v-btn @click="submit">submit</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- {{pickedclasses}} -->
    <!-- {{classes}} -->
    <!-- {{kt}} -->
    </v-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware:'email',
  async asyncData({$axios, store}){
    // $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/getclasses");
    if(res.success) return {classes: res.data};
  },
  data(){
    return{
      schools: ['ХШУИС','БС','ШУС','ОУХНУС','ХЗС'],
      yoschool:"",
      firstname:"",
      lastname:"",
      major:"",
      classes:"",
      pickedclasses: null,
      majors: null,
      kt: null
    }
  },
  watch:{
    async yoschool(val){
      console.log(val)
      this.$axios.setToken(this.$store.state.token);
      let res = await this.$axios.$get("http://localhost:8080/getschoolmajors/" + val)
      console.log(res)
      if(res.success) this.majors = res.data;
    },
    majors: function(val){
      let smt = val;
      console.log(val.length);
      let kt = []
      for(let i = 0; i < smt.length; i ++){
        let j = 0
        for(; j < kt.length; j++){
          if(kt[j].Хөтөлбөрийн_монгол_нэр == smt[i].Хөтөлбөрийн_монгол_нэр || kt[j].Хөтөлбөрийн_монгол_нэр + " " == smt[i].Хөтөлбөрийн_монгол_нэр || kt[j].Хөтөлбөрийн_монгол_нэр == smt[i].Хөтөлбөрийн_монгол_нэр + " ") break;
        }
        if(j == kt.length) kt.push(smt[i]);
        if(i+1 == val.length) this.kt = kt;
      }
      console.log(kt);
    }
  },
  methods:{
    async submit(){
      let data = {
        school: this.yoschool,
        firstname: this.firstname,
        lastname: this.lastname,
        major: this.major,
        classes: this.pickedclasses,
        email: this.$store.state.email,
        password: this.$store.state.password
      }
      let res = await this.$axios.$post("http://localhost:8080/signup",data)
      if(res.success) this.$router.push("/login")
      else this.$router.push("/signup")
    }
  }
}
</script>

<style lang="css" scoped>
    body{
      background-image: url('')
      qweasdzxc

    }
  .header{
    height: 100px;
    width: 100%;
  }
  .logo{
    height: 100px;
  }
  .nav{
    height: 100%;
  }
  .nav ul{
    height: 100%;
  }
  .nav ul li{
    float:left;
    list-style: none;
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }
  .link{
    text-decoration: none;
    color: black;
  }
  .text{
    font-size: 16px;
    font-weight: 700;
    font-family:  'Roboto Condensed', sans-serif;
  }
  .nav ul li:first-child{
    padding-left: 0px;
  }
</style>
