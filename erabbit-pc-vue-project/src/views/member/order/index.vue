<template>
  <div class="member-order">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{ item.label }}</XtxTabsPanel
      >
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from "vue";
import { orderStatus } from "@/api/constants";
export default {
  name: "OrderMember",
  setup () {
    const activeName = ref("all");
    const tabClick = (tab) => {
      console.log(tab);
    };
    return { activeName, tabClick, orderStatus };
  }
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background-color: #fff;
}
</style>
