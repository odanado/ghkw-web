<template>
  <a
    @click="onClick"
    class="flex items-center h-10 text-white bg-black rounded cursor-pointer hover:opacity-75"
  >
    <i class="flex items-center ml-2 fab fa-github"></i>
    <span class="flex items-center h-full ml-2 pl-2 border-l select-none"
      >Sign in with GitHub</span
    >
  </a>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  @Emit("onClick")
  onClick() {}
}
</script>
