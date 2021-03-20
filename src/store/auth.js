import firebase from "@/firebase";
import router from "../router";
import db from "../db";
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

const getters = {
  getId: (state) => {
    return state.user.id;
  },
};
const actions = {
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    // console.log(result);
  },

  async logout({ _, state }) {
    if (state.isLoggedIn) {
      db.collection("users")
        .doc(state.user.id)
        .update({ signed_in: false });
      console.log("logged in user log out");
    }
    await firebase.auth().signOut();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
