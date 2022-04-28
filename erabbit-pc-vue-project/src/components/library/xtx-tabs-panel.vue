<template>
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot></slot>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "XtxTabsPanel",
  // $slot.default() 获取默认插槽内容
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: [String, Number],
      default: ""
    }
  },
  setup () {
    const activeName = inject("activeName");
    return { activeName };
  }
};
</script>
