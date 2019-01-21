<template>
  <div id="app" class="max-w-md mx-auto py-8">
    <div class="flex shadow-md rounded py-2 px-4">
      <keyword-input class="sm:flex-grow"/>
      <a @click="search" class>search</a>
    </div>
    <a @click="signIn">signIn</a>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import Octokit from "@octokit/rest";

import { Component, Vue } from "vue-property-decorator";

import KeywordInput from "./components/KeywordInput.vue";

@Component({
  components: {
    KeywordInput
  }
})
export default class App extends Vue {
  private userCredential?: firebase.auth.UserCredential;
  private accessToken?: string;
  private octokit?: Octokit;
  async signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.userCredential = await firebase.auth().signInWithPopup(provider);

    if (this.userCredential) {
      // XXXX
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
