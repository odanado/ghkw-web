import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {
    isSignIn(state) {
      return state.accessToken !== null;
    }
  },
  mutations: {
    setAccessToken(state, { accessToken }) {
      state.accessToken = accessToken;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    }
  },
  actions: {
    init(context) {
      const accessToken = localStorage.getItem("accessToken");
      context.commit("setAccessToken", { accessToken });
    },
    async signIn() {
      const provider = new firebase.auth.GithubAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
    },
    setAccessToken(context, { accessToken }) {
      context.commit("setAccessToken", { accessToken });
      localStorage.setItem("accessToken", accessToken);
    },
    async signOut(context) {
      context.commit("clearAccessToken");
      localStorage.removeItem("accessToken");
    }
  }
});
