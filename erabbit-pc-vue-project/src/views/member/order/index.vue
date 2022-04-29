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
        @on-cancel-order="onCancelOrder"
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > 0"
      :total="total"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      @current-change="pageChange"
    ></XtxPagination>
  </div>
  <!-- 取消订单组件 -->
  <OrderCancel ref="orderCancelCom"/>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { orderStatus } from "@/api/constants";
import OrderItem from "./components/order-item";
import OrderCancel from "./components/order-cancel";
import { findOrderList } from "@/api/order";
export default {
  name: "OrderMember",
  components: { OrderItem, OrderCancel },
  setup () {
    const activeName = ref("all");
    const orderList = ref([]);
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    });
    const loading = ref(false);
    const total = ref(0);
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
          total.value = data.result.counts;
          loading.value = false;
        });
      },
      { immediate: true }
    );
    // // 查询订单
    // findOrderList(reqParams).then((data) => {
    //   orderList.value = data.result.items;
    // });
    // 页数改变时
    const pageChange = (index) => {
      reqParams.page = index;
    };
    return {
      activeName,
      tabClick,
      orderStatus,
      orderList,
      loading,
      total,
      reqParams,
      pageChange,
      ...useCancelOrder()
    };
  }
};
// 封装逻辑-取消订单
const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = (order) => {
    // console.log(order)
    // item 就是你要取消的订单
    orderCancelCom.value.open(order)
  }
  return { onCancelOrder, orderCancelCom }
}
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
