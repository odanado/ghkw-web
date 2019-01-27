import Vue from "vue";
import Vuex from "vuex";

import { orderBy } from "lodash";
import firebase from "firebase";
import Octokit from "@octokit/rest";

Vue.use(Vuex);

const octokit = new Octokit();

export default new Vuex.Store({
  state: {
    accessToken: null,
    keywords: [] as Array<string>
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
    },
    addKeyword(state, { keyword }) {
      state.keywords.push(keyword);
    },
    clearKeywords(state) {
      state.keywords = [];
    }
  },
  actions: {
    init(context) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        context.dispatch("setAccessToken", { accessToken });
      }
    },
    async signIn() {
      const provider = new firebase.auth.GithubAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
    },
    setAccessToken(context, { accessToken }) {
      context.commit("setAccessToken", { accessToken });
      localStorage.setItem("accessToken", accessToken);
      context.dispatch("setupAuthenticate", { accessToken });
    },
    async signOut(context) {
      context.commit("clearAccessToken");
      localStorage.removeItem("accessToken");
    },
    setupAuthenticate(_, { accessToken }) {
      octokit.authenticate({
        type: "token",
        token: accessToken
      });
    },
    async search(context) {
      const promisedResults = context.state.keywords.map(async keyword => {
        const { data } = await octokit.search.code({
          q: keyword
        });

        return {
          keyword,
          total: data.total_count as number
        };
      });

      const results = await Promise.all(promisedResults);
      const orderedResults = orderBy(
        results,
        ["total", "keyword"],
        ["desc", "asc"]
      ).map((result, index) => ({ rank: index + 1, ...result }));
      return orderedResults;
    }
  }
});
