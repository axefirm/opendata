<template lang="html">
  <v-layout >
    <div class="login">
      <nuxt-link to="/login" class="text center">Login</nuxt-link>
    </div>
    <div class="signup-btn">
    <nuxt-link to="/signup" class="center">Signup</nuxt-link>
  </div>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.center{
  height: 100%;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.text{
text-decoration: none;
color: black;
font-size: 50px;
font-weight: 700;
}
.login{
  width: 100%;
  height: 100vh;
  background-image: url("~assets/background/background.jpg");
  background-size: cover;
  background-position: center;
}
.signup-btn{
  color: white;
  text-decoration: none;
  font-weight: 700;
  height: 40px;
  border-radius: 40px;
  width: 100px;
  background-color: #A5F2F1;
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
