<template lang="html">
  <div class="container">
    <div class="header">
      <div class="nav">
        <ul >
        <li><img src="~/assets/menu/kt.png" alt="" class="logo"></li>
        <li><nuxt-link class="link text" to="/next">Дараа улирал</nuxt-link></li>
        <li><nuxt-link class="link text" to="/all"> Бүх улирал</nuxt-link></li>
        </ul>
      </div>
    </div>
    <div class="select">
      <v-flex xs12 sm6 md6>
        <v-flex xs12 sm6 d-flex>
          <v-select
          :items="schools"
          label="Салбар сургууль"
          outline
          v-model="yoschool"
          ></v-select>
        </v-flex>
      </v-flex>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware:'auth',
  data(){
    return{
      schools: ['БС','ХШУИС','БУС','ХУС','НУС','ОУХНУС','ХЗС'],
      yoschool:"",
    }
  }
}
</script>

<style lang="css" scoped>
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
