<template>
  <main>
    <section class="flex item-center justify-center mt-4">
      <p v-if="isRedirecting">リダイレクト中...</p>
      <sign-in-button v-else @onClick="signIn" class="w-1/2" />
    </section>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

import SignInButton from "@/components/SignInButton.vue";

@Component({
  components: {
    SignInButton
  }
})
export default class App extends Vue {
  private redirectParam = "redirecting";
  get isRedirecting() {
    return this.$route.hash === `#${this.redirectParam}`;
  }
  async redirect() {
    if (!this.isRedirecting) {
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
    if (this.$store.getters.isSignIn) {
      this.$router.replace({ path: "/" });
    }
    await this.redirect();
  }
  async signIn() {
    this.$router.replace({ hash: this.redirectParam });
    await this.$store.dispatch("signIn");
  }
}
</script>
