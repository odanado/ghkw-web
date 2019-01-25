<template>
  <main><sign-in-button @onClick="signIn" class="w-1/2" /></main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

import store from "@/store";
import SignInButton from "@/components/SignInButton.vue";

@Component({
  components: {
    SignInButton
  }
})
export default class App extends Vue {
  async redirect() {
    if (this.$route.hash !== "#redirecting") {
      return;
    }
    const user = await firebase.auth().getRedirectResult();
    if (user.credential) {
      await this.$store.dispatch("setAccessToken", {
        accessToken: (user.credential as any).accessToken
      });
      this.$router.push({ path: "/" });
    } else {
      this.$router.replace({ hash: "" });
    }
  }
  async created() {
    await this.redirect();
  }
  async signIn() {
    this.$router.replace({ hash: "redirecting" });
    await store.dispatch("signIn");
  }
}
</script>
