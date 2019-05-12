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
          <v-text-field
            v-model="major"
            :counter="10"
            label="Major"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="classes"
            label="Classes"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    </v-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware:'auth',
  data(){
    return{
      schools: ['ХШУИС','БС','БУС','ХУС','НУС','ОУХНУС','ХЗС'],
      yoschool:"",
      firstname:"",
      lastname:"",
      major:"",
      classes:""
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
