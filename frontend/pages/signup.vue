<template lang="html">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
        <p v-if="error">{{errorMessage}}</p>
        <v-text-field
          label="Email"
          type="email"
          v-model="email"
        >
        </v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        >
        </v-text-field>
        <v-btn color="success" @click="signup()">Signup</v-btn>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  data(){
    return{
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    }
  },
  methods:{
    async signup(){
      await this.$store.dispatch('signInfo', {email: this.email, password: this.password})
      this.$router.push("/menu")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
