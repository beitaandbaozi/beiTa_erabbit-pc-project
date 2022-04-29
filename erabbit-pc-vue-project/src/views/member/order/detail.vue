<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>

<script>
import { ref } from "vue";
import DetailAction from "./components/detail-action.vue";
import DetailStep from "./components/detail-step.vue";
import { findOrder } from "@/api/order";
import { useRoute } from "vue-router";
export default {
  name: "MemberDetail",
  components: { DetailAction, DetailStep },
  setup () {
    const order = ref(null);
    const route = useRoute();
    // 获取当前订单数据
    findOrder(route.params.id).then((data) => {
      order.value = data.result;
    });
    return { order };
  }
};
</script>

<style lang="less" scoped>
.member-order-detail {
  background-color: #fff;
  height: 100%;
}
</style>
