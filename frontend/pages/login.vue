<template lang="html">
  <div class="lcontainer">
    <div class="login-section">
      <div class="form">
        <div class="">
          <div class="headline">
            <p>Login</p>
          </div>
          <v-text-field
          label="username"
          type="email"
          color="#8053CB"
          v-model="username"
          ></v-text-field>
          <v-text-field
          label="Password"
          type="password"
          color="#8053CB"
          v-model="password"
          ></v-text-field>
          <v-checkbox
          class="nopadding"
          color="#8053CB"
          v-model="remembered"
          label="Remember me"
          ></v-checkbox>
          <div class="lbtn">
            <v-btn class="lbtn-item" color="#DB71CD" @click="login()" >Sign in</v-btn>
          </div>

        </div>
      </div>
      <div class="image">
        <h2>Hey</h2>
        <h2>Welcome</h2>
        <h2>Back</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'funny',
  data(){
    return{
      username: "",
      password: "",
      remembered: false
    }
  },
  watch:{
    username(val){
      console.log("i am watching you")
      if(val.length > 0) this.isTyping = true;
      else this.isTyping = false;
    },
  },
  computed:{
    amITyping(){
      if(this.isTyping == true) return "You are typing";
      else return "";
    },
  },
  methods:{
    changeIt(){
      this.num = 112;
    },
    async login(){
      let res = await this.$axios.$post("http://localhost:8080/login", {username: this.username, password: this.password})
      if(res.success){
        this.$cookies.set('_id', res.data._id, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('token', res.data.token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$store.dispatch('login', {token: res.data.token, _id: res.data._id})
        this.$router.push("/menu")
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .form{
    padding: 40px;
  }
  .special{
    color: #DB71CD;
  }
  a{
    text-decoration: none;
    color:"#8053CB";
    font-weight: 700;
  }
  .center{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .lcontainer{
    min-height: 100vh;
    background: linear-gradient(to right bottom, #FFE6F7 , #EDECFF);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .headline p{
    text-transform: uppercase;
    font-weight: 700;
    font-size: 28px;
    color: #8053CB;
  }
  .subline{
    color: #979797;
  }
  .lbtn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .lbtn-item{
    width: 50%;
    color: white;
    text-transform: capitalize;
  }
  .image{
    background-position: center;
    background-size: cover;
    background-image: url("../assets/logins/1/Mask_Group_1.png");
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 40px;
    }
    h2{
      color: white;
      font-size: 32px;
      line-height: 1;
    }
    .login-section{
      background-color: white;
      -webkit-box-shadow: 0px 10px 16px 0px rgba(0,0,0,0.48);
      -moz-box-shadow: 0px 10px 16px 0px rgba(0,0,0,0.48);
      box-shadow: 0px 10px 16px 0px rgba(0,0,0,0.48);
    }
  @media only screen and (min-width:961px){
    .login-section{
      width: 910px;
      height: 520px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-radius: 5px;
      overflow: hidden;

    }
    .image{
      padding-bottom: 60px;
    }
    .form{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
    @media only screen and (min-width: 601px) and (max-width:960px) {
      .login-section{
        width: 70%;
      }
      .image{
        padding-top:20px;
        padding-bottom:20px;
      }
    }
    @media only screen and (max-width: 600px) {
      .login-section{
        width: 100%;
      }
      .image{
        padding-top:20px;
        padding-bottom:20px;
      }
    }
</style>
