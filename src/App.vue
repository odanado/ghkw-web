<template>
  <div id="app" class="h-full min-h-screen">
    <app-header class="h-10 mb-2" />
    <loading
      v-if="isWebFontLoading"
      class="flex mt-10 items-center justify-center"
    />
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppHeader from "@/components/AppHeader.vue";
import Loading from "@/components/Loading.vue";

@Component({
  components: {
    AppHeader,
    Loading
  }
})
export default class App extends Vue {
  get isWebFontLoading() {
    return this.$store.state.isWebFontLoading;
  }
}
</script>
