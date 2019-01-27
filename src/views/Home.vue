<template>
  <div id="app" class="font-sans container mx-auto mt-8">
    <div class="flex shadow-md rounded py-2 px-4">
      <keyword-input class="w-full sm:flex-grow" />
      <search-button @onClick="search" />
    </div>
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

@Component({
  components: {
    KeywordInput,
    SearchButton,
    SignInButton
  }
})
export default class App extends Vue {
  private accessToken?: string;
  private octokit?: Octokit;
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
  async search() {
    const result = await this.octokit!.search.code({
      q: "exclude_condition"
    });

    console.log(result);
  }
}
</script>
