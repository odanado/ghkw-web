<template>
  <div id="app" class="font-sans container mx-auto py-8">
    <div class="flex shadow-md rounded py-2 px-4">
      <keyword-input class="w-full sm:flex-grow" />
      <search-button @onClick="poyo" />
    </div>
    <sign-in-button @onClick="signIn" class="w-1/2" />
    <br />
    <a @click="search" class>search</a> <a @click="signIn">signIn</a>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import Octokit from "@octokit/rest";

import { Component, Vue } from "vue-property-decorator";

import KeywordInput from "./components/KeywordInput.vue";
import SearchButton from "./components/SearchButton.vue";
import SignInButton from "./components/SignInButton.vue";

@Component({
  components: {
    KeywordInput,
    SearchButton,
    SignInButton
  }
})
export default class App extends Vue {
  private userCredential?: firebase.auth.UserCredential;
  private accessToken?: string;
  private octokit?: Octokit;
  poyo() {
    console.log("poyo");
  }
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
