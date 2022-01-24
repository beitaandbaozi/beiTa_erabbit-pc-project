<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
        >{{item.name}}</a>
      </div>
    </div>
    <div
      class="item"
      v-for="item in filterData.saleProperties"
      :key="item.id"
    >
      <div class="head">{{item.name}}</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="prop in item.properties"
          :key="prop.id"
        >{{prop.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findSubCategoryFilter } from "@/api/category";
export default {
  name: "SubFilter",
  setup () {
    const route = useRoute();
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null);
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的ID有值，且处于二级类名路由
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 获取数据
          findSubCategoryFilter(route.params.id).then((data) => {
            // 每一组可选的筛选条件缺失 全部 条件，处理下数据加上全部
            // 1.品牌
            data.result.brands.unshift({ id: null, name: "全部" });
            // 2.属性
            data.result.saleProperties.forEach((item) => {
              item.properties.unshift({ id: null, name: "全部" });
            });
            filterData.value = data.result;
          });
        }
      },
      {
        immediate: true,
      }
    );
    return { filterData };
  },
};
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
