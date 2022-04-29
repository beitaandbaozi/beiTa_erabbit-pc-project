<template>
  <div class="detail-step">
    <XtxSteps :active="3">
      <XtxStepsItem title="创建订单" desc="2022-04-30 10:10:10"></XtxStepsItem>
      <XtxStepsItem title="已发货" desc="2022-04-30 10:10:10"></XtxStepsItem>
      <XtxStepsItem title="完成订单" desc="2022-04-30 10:10:10"></XtxStepsItem>
    </XtxSteps>
  </div>
</template>

<script>
export default {
  name: "DetailStep",
  setup () {}
};
</script>

<style lang="less" scoped></style>
