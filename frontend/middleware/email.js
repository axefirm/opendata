export default function ({ store, redirect }) {
  if(!store.state.email && ! store.state.password) {
    return redirect('/signup')
  }
}
