<template>
  <div id="app">
    <a @click="signIn">signIn</a>
    <a @click="search">search</a>
    <div class="text-red-dark">{{ accessToken }}</div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import Octokit from "@octokit/rest";

import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  private userCredential?: firebase.auth.UserCredential;
  private accessToken?: string;
  private octokit?: Octokit;
  async signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.userCredential = await firebase.auth().signInWithPopup(provider);

    if (this.userCredential) {
      // XX
      this.accessToken = (this.userCredential.credential as any).accessToken;
      this.octokit = new Octokit();
      this.octokit.authenticate({
        type: "token",
        token: this.accessToken!
      });
    }
    console.log(this.userCredential);
  }
  async created() {
    console.log("poyo");
  }
  async search() {
    const result = await this.octokit!.search.code({
      q: "exclude_condition"
    });

    console.log(result);
  }
}
</script>