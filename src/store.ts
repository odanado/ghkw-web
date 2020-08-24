import Vue from "vue";
import Vuex from "vuex";
import {
  Getters,
  Mutations,
  Actions,
  Module,
  createStore
} from "vuex-smart-module";

import { orderBy } from "lodash";
import firebase from "firebase";
import Octokit from "@octokit/rest";

Vue.use(Vuex);

const octokit = new Octokit();

class State {
  isWebFontLoading = true;
  accessToken?: string;
  keywords: Array<string> = [];
}

class Getter extends Getters<State> {
  get isSignIn(): boolean {
    return this.state.accessToken !== undefined;
  }
}

class Mutation extends Mutations<State> {
  setIsWebFontLoading({ isWebFontLoading }: { isWebFontLoading: boolean }) {
    this.state.isWebFontLoading = isWebFontLoading;
  }

  setAccessToken({ accessToken }: { accessToken: string }) {
    this.state.accessToken = accessToken;
  }

  clearAccessToken() {
    this.state.accessToken = undefined;
  }

  addKeyword({ keyword }: { keyword: string }) {
    this.state.keywords.push(keyword);
  }

  clearKeywords() {
    this.state.keywords = [];
  }

  setKeywords({ keyword }: { keyword: string }) {
    this.state.keywords = keyword.trim().split(" ");
  }
}

class Action extends Actions<State, Getter, Mutation, Action> {
  setupAuthenticate({ accessToken }: { accessToken: string }) {
    octokit.authenticate({
      type: "token",
      token: accessToken
    });
  }

  setAccessToken({ accessToken }: { accessToken: string }) {
    this.commit("setAccessToken", { accessToken });
    localStorage.setItem("accessToken", accessToken);
    this.dispatch("setupAuthenticate", { accessToken });
  }

  loadAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.dispatch("setAccessToken", { accessToken });
    }
  }

  async signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  }

  signOut() {
    // XXXX: payload?
    this.commit("clearAccessToken", undefined);
    localStorage.removeItem("accessToken");
  }

  async search() {
    const promisedResults = this.state.keywords.map(async keyword => {
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

export const rootModule = new Module({
  state: State,
  getters: Getter,
  mutations: Mutation,
  actions: Action
});

const store = createStore(rootModule, {
  strict: process.env.NODE_ENV !== "production"
});

export default store;
