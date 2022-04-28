<template>
  <div>OrderMember</div>
  <XtxTabs>
    <XtxTabsPanel label="选项卡0" name="0">内容0</XtxTabsPanel>
    <XtxTabsPanel
      v-for="(item, index) in 4"
      :key="index + 1"
      :label="`选项卡${index + 1}`"
      :name="`name ${index + 1}`"
      >内容{{ index + 1 }}</XtxTabsPanel
    >
  </XtxTabs>
</template>

<script>
export default {
  name: "OrderMember",
  setup () {}
};
</script>

<style lang="less" scoped></style>
