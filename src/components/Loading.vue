<template>
  <div><i class="circle text-blue fas fa-spinner fa-7x" /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Loading extends Vue {}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circle {
  animation-name: rotate;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}
</style>
