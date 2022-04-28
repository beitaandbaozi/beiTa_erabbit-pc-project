<template>
  <div class="xtx-tabs-panel">
    <slot></slot>
  </div>
</template>
<script>
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
  }
};
</script>
