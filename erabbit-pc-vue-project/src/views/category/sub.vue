<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort />

      </div>
    </div>
  </div>
</template>

<script>
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
export default {
  name: "SubCategory",
  components: { SubBread, SubFilter, SubSort },
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
