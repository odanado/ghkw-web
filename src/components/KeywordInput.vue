<template>
  <input
    @input="updateKeyword"
    @keyup.enter="onEnter"
    :value="keyword"
    type="text"
    placeholder="検索 (単語はスペース区切り)"
    class="py-2s leading-normal border-transparent bg-grey-lighter focus:outline-none hover:border-grey-lighter hover:bg-white text-black border border-transparent rounded"
  />
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component({})
export default class KeywordInput extends Vue {
  @Prop({ type: String, default: "" }) keyword!: string;

  @Emit("update:keyword")
  updateKeyword(event: any) {
    // XXXX
    return event.target.value;
  }
  @Emit("onEnter")
  onEnter() {}
}
</script>
