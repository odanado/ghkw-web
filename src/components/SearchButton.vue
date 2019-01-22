<template>
  <a
    @click="onClick()"
    class="flex items-center justify-center pl-3 text-blue-dark hover:text-blue"
  >
    <i class="fas fa-search fa-lg"></i>
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
