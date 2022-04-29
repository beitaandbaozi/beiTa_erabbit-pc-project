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
        @on-delete-order="onDeleteOrder"
        @on-confirm-order="onConfirmOrder"
        @on-logistics-order="onLogisticsOrder"
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
  <OrderCancel ref="orderCancelCom" />
  <!-- 物流信息 -->
  <OrderLogistics ref="orderLogisticsCom" />
</template>

<script>
import { reactive, ref, watch } from "vue";
import { orderStatus } from "@/api/constants";
import OrderItem from "./components/order-item";
import OrderCancel from "./components/order-cancel";
import OrderLogistics from "./components/order-logistics";
import { findOrderList, deleteOrder, confirmOrder } from "@/api/order";
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";
export default {
  name: "OrderMember",
  components: { OrderItem, OrderCancel, OrderLogistics },
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
    const findOrderListFn = () => {
      loading.value = true;
      findOrderList(reqParams).then((data) => {
        orderList.value = data.result.items;
        total.value = data.result.counts;
        loading.value = false;
      });
    };
    // 根据点击tab时 orderState类型发生变化，就重新加载
    watch(
      reqParams,
      () => {
        findOrderListFn();
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
    // 删除订单
    const onDeleteOrder = (order) => {
      Confirm({ text: "您确认删除该条订单吗？" })
        .then(() => {
          deleteOrder([order.id]).then(() => {
            Message({ text: "删除订单成功", type: "success" });
            findOrderListFn();
          });
        })
        .catch((e) => {});
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
      onDeleteOrder,
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    };
  }
};
// 封装逻辑-取消订单
export const useCancelOrder = () => {
  const orderCancelCom = ref(null);
  const onCancelOrder = (order) => {
    // console.log(order)
    // item 就是你要取消的订单
    orderCancelCom.value.open(order);
  };
  return { onCancelOrder, orderCancelCom };
};
// 封装逻辑-确认收货
export const useConfirmOrder = () => {
  const onConfirmOrder = (order) => {
    Confirm({ text: "您确认收到货吗？确认后货款将会打给卖家" })
      .then(() => {
        confirmOrder(order.id).then(() => {
          Message({ text: "确认收货成功", type: "success" });
          // 更改订单状态
          order.orderState = 4;
        });
      })
      .catch((e) => {});
  };
  return { onConfirmOrder };
};
// 查看物流信息
export const useLogisticsOrder = () => {
  const orderLogisticsCom = ref(null);
  const onLogisticsOrder = (order) => {
    console.log(order);
    orderLogisticsCom.value.open(order);
  };
  return { onLogisticsOrder, orderLogisticsCom };
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
