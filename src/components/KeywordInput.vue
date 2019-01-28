<template>
  <input
    @input="$emit('update:keyword', $event.target.value)"
    :value="keyword"
    type="text"
    placeholder="検索"
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
}
</script>
