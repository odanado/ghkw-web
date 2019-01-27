<template>
  <div id="app" class="font-sans container mx-auto mt-4">
    <div class="flex shadow-md rounded py-2 px-4">
      <keyword-input
        class="w-full sm:flex-grow"
        @updateKeyword="updateKeyword"
      />
      <search-button @onClick="search" />
    </div>
    <result :data="results" class="my-6" />
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import Octokit from "@octokit/rest";

import { Component, Vue } from "vue-property-decorator";

import store from "@/store";
import KeywordInput from "@/components/KeywordInput.vue";
import SearchButton from "@/components/SearchButton.vue";
import SignInButton from "@/components/SignInButton.vue";
import Result from "@/components/Result.vue";

@Component({
  components: {
    KeywordInput,
    SearchButton,
    SignInButton,
    Result
  }
})
export default class Home extends Vue {
  private accessToken?: string;
  private octokit?: Octokit;
  private results = [];
  private keyword: string = "";
  poyo() {
    console.log("poyo");
  }
  async signOut() {
    await store.dispatch("signOut");
    this.$router.push({ path: "/sign-in" });
  }
  async created() {
    this.octokit = new Octokit();
    this.octokit.authenticate({
      type: "token",
      token: store.state.accessToken!
    });
  }
  updateKeyword(keyword: string) {
    this.keyword = keyword;
  }
  async search() {
    this.$store.commit("clearKeywords");
    this.keyword
      .trim()
      .split(" ")
      .map(keyword => this.$store.commit("addKeyword", { keyword }));
    const results = await this.$store.dispatch("search");

    this.results = results;
  }
}
</script>
