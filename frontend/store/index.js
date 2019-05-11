const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  token: null,
  _id: null,
  email: null,
  password: null,
  firstname: 'Mergen',
  lastname: 'Ganbat',
  successMessage: null
})

export const mutations = {
  setAuth(state, data){
    state.token = data.token;
    state._id = data._id;
  },
  setSignInfo(state, data){
    state.email = data.email;
    state.password = data.password;
  },
  removeSignInfo(state, data){
    state.email = null;
    state.password = null;
  },
  removeAuth(state){
    state.token = null;
    state._id = null;
  },
  success(state, data){
    state.successMessage = data.message;
  },
  removeSuccess(state){
    state.successMessage = null;
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }){
    if(req.headers.cookie){
      const parsed = cookieparser.parse(req.headers.cookie);
      let res = await $axios.$get('http://localhost:8080/mjolnir/' + parsed._id + "/" + parsed.token)
      if(res.success) commit('setAuth', parsed);
    }
  },
  signInfo({commit}, data){
    commit('setSignInfo', data);
  },
  async signUp({state}, data){
    const smt = {
      major: data.major,
      classes: data.classes,
      email: state.email,
      password: state.password,
      firstname: data.firstname,
      lastname: data.lastname
    }
    let res = await this.$axios.$post("http://localhost:8080/signup", smt);
    if(res.success) commit('success', {message: "Амжилттай бүртгэгдлээ"});
  },
  login({ commit }, data){
    commit('setAuth', data);
  },
  logout({commit}){
    commit('removeAuth');
  }
}
