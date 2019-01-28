<template>
  <div id="app" class="font-sans container mx-auto mt-4">
    <div class="flex shadow-md rounded py-2 px-4">
      <keyword-input
        class="w-full sm:flex-grow"
        @onEnter="search"
        :keyword.sync="keyword"
      />
      <search-button @onClick="search" class="ml-3" />
    </div>
    <result :data="results" class="my-6" />
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import Octokit from "@octokit/rest";

import { Component, Vue, Watch } from "vue-property-decorator";

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

    if (this.$route.query.q) {
      this.keyword = this.$route.query.q as string;
      this.search();
    }
  }
  async search() {
    this.$store.commit("setKeywords", { keyword: this.keyword });

    const results = await this.$store.dispatch("search");

    this.results = results;
  }
  @Watch("keyword")
  onChangeKeyword() {
    this.$router.replace({ query: { q: this.keyword } });
  }
}
</script>
