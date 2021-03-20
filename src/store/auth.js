import firebase from "@/firebase";
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
    db.collection("users")
      .doc(state.user.id)
      .update({ signed_in: false });
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
