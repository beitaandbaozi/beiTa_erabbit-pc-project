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
import { reactive, ref, watch } from "vue";
import { orderStatus } from "@/api/constants";
import OrderItem from "./components/order-item";
import { findOrderList } from "@/api/order";
export default {
  name: "OrderMember",
  components: { OrderItem },
  setup () {
    const activeName = ref("all");
    const orderList = ref([]);
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    });
    // 条件渲染
    const tabClick = ({ index }) => {
      // 1.初始化页数
      reqParams.page = 1;
      // 2.更换类别
      reqParams.orderState = index;
      // 3.重新加载
    };
    // 根据点击tab时 orderState类型发生变化，就重新加载
    watch(
      reqParams,
      () => {
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items;
        });
      },
      { immediate: true }
    );
    // // 查询订单
    // findOrderList(reqParams).then((data) => {
    //   orderList.value = data.result.items;
    // });
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
