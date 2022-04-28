<template>
  <div>OrderMember</div>
  <XtxTabs v-model="activeName" @tab-click="tabClick">
    <XtxTabsPanel label="选项卡0" name="first">内容0</XtxTabsPanel>
    <XtxTabsPanel
      v-for="(item, index) in 4"
      :key="index + 1"
      :label="`选项卡${index + 1}`"
      :name="`name${index + 1}`"
      >内容{{ index + 1 }}</XtxTabsPanel
    >
  </XtxTabs>
</template>

<script>
import { ref } from "vue";
export default {
  name: "OrderMember",
  setup () {
    const activeName = ref("name1");
    const tabClick = (tab) => {
      console.log(tab);
    };
    return { activeName, tabClick };
  }
};
</script>

<style lang="less" scoped></style>
