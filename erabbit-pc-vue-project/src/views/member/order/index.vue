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
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
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
    const loading = ref(false);
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
        loading.value = true;
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items;
          loading.value = false;
        });
      },
      { immediate: true }
    );
    // // 查询订单
    // findOrderList(reqParams).then((data) => {
    //   orderList.value = data.result.items;
    // });
    return { activeName, tabClick, orderStatus, orderList, loading };
  }
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background-color: #fff;
  .order-list {
    padding: 20px;
    position: relative;
    min-height: 400px;
  }
  .loading {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
      no-repeat center;
  }
  .none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
  }
}
</style>
