<template>
  <div class="member-order">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination></XtxPagination>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { orderStatus } from "@/api/constants";
import OrderItem from "./components/order-item";
import { findOrderList } from "@/api/order";
export default {
  name: "OrderMember",
  components: { OrderItem },
  setup () {
    const activeName = ref("all");
    const tabClick = (tab) => {
      console.log(tab);
    };
    const orderList = ref([]);
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    });
    // 查询订单
    findOrderList(reqParams).then((data) => {
      orderList.value = data.result.items;
    });
    return { activeName, tabClick, orderStatus, orderList };
  }
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background-color: #fff;
  .order-list {
    padding: 20px;
  }
}
</style>
