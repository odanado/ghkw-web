<template>
  <div id="app">
    <a @click="signIn">signIn</a>
    <div class="text-red-dark">aaa</div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";

import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  private userCredential?: firebase.auth.UserCredential;
  async signIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.userCredential = await firebase.auth().signInWithPopup(provider);
    console.log(this.userCredential);
  }
  async created() {
    console.log("poyo");
  }
}
</script>