import firebase from "@/firebase";
const state = {
  user: {},
  isLoggedIn: false,
};

const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = user;
      state.isLoggedIn = true;
      // console.log(user);
    } else {
      state.user = {};
      state.isLoggedIn = false;
    }
  },
  setPhone(state, phone) {
    state.user.phone = phone;
  },
};
const actions = {
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    // console.log(result);
  },

  async logout() {
    await firebase.auth().signOut();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
