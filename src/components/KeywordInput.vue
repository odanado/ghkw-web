<template>
  <input
    v-model="keyword"
    @change="updateKeyword"
    type="text"
    placeholder="検索"
    class="py-2s leading-normal border-transparent bg-grey-lighter focus:outline-none hover:border-grey-lighter hover:bg-white text-black border border-transparent rounded"
  />
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class KeywordInput extends Vue {
  private keyword = "";
  @Emit("updateKeyword")
  updateKeyword() {
    return this.keyword;
  }
}
</script>
