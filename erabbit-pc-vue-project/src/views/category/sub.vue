<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul>
          <li
            v-for="goods in goodsList"
            :key="goods.id"
          >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :finished="finished"
          :loading="loading"
          @infinite="getData"
        >
        </XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findSubCategoryGoods } from "@/api/category";
export default {
  name: "SubCategory",
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup () {
    const route = useRoute();
    // 加载中
    const loading = ref(false);
    // 是否加载完毕
    const finished = ref(false);
    // 商品列表数据
    const goodsList = ref([]);
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    // 获取数据函数
    const getData = () => {
      loading.value = true;
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items);
          reqParams.page++;
        } else {
          // 加载完毕
          finished.value = true;
        }
        // 请求结束
        loading.value = false;
      });
    };
    // 在更改二级分类的时候需要重新加载数据
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 清空的时候，加载更多组件会顶上来，进入可视区，直接加载数据
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
          finished.value = false;
        }
      }
    );
    // 1.更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    // 2.更改筛选组件的筛选数据，重新请求
    const filterChange = (filterParams) => {
      // console.log(filterParams);
      finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    return { getData, loading, finished, goodsList, sortChange, filterChange };
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
