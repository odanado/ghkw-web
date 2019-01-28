<template>
  <div id="app">
    <app-header class="h-10 mb-2" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppHeader from "@/components/AppHeader.vue";

@Component({
  components: {
    AppHeader
  }
})
export default class App extends Vue {}
</script>
