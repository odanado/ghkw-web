<template>
  <div class="container">
    <template v-for="(text, index) in ['rank', 'keyword', 'total']">
      <div
        :key="`header-${index}`"
        class="bg-grey-light text-black text-center p-2"
      >
        {{ text }}
      </div>
    </template>
    <template v-for="{ rank, keyword, total } in data">
      <div :key="`rank-${rank}`" class="text-center p-2">{{ rank }}</div>
      <div :key="`keyword-${rank}`" class="text-center p-2">{{ keyword }}</div>
      <div :key="`total-${rank}`" class="text-center p-2">{{ total }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface DataType {
  rank: Number;
  keyword: String;
  total: Number;
}

@Component({})
export default class Result extends Vue {
  @Prop({ type: Array, default: [] }) data!: Array<DataType>;
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
}
</style>
