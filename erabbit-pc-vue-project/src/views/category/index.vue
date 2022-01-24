<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <!-- 加上key的原因是让结点重新创建===> 这样是为了实现动画切换的原因 -->
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel
        :sliders="sliders"
        style="height:500px"
      />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li
            v-for="sub in topCategory.children"
            :key="sub.id"
          >
            <a href="javascript:;">
              <img :src="sub.picture">
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div
        class="ref-goods"
        v-for="sub in subList"
        :key="sub.id"
      >
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { findBanner } from "@/api/home";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import GoodsItem from "./components/goods-item";
import { findTopCategory } from "@/api/category";
export default {
  name: "TopCategory",
  components: {
    GoodsItem,
  },
  setup () {
    // 轮播图数据
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });
    // 面包屑+所有子分类 ===> vuex
    const store = useStore();
    const router = useRoute();
    const topCategory = computed(() => {
      let cate = {};
      // 当前的顶级分类 ===根据路由上的ID去Vuex中category模块的list中查找
      const item = store.state.category.list.find((item) => {
        return item.id === router.params.id;
      });
      if (item) cate = item;
      return cate;
    });
    // 获取各个子类目下推荐商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(router.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    // 定义API，组件初始化要去加载数据，但是动态路由不会重新初始化组件。
    // 如果监听地址栏id的变化，然后变化了就去加载数据，但是初始化有不会加载了。
    // 不过watch提供了 immediate: true 可让watch初始化的时候主动触发一次。
    // 监听地址栏是否变化
    watch(
      () => router.params.id,
      (newVal) => {
        newVal && getSubList();
      },
      { immediate: true }
    );

    return { sliders, topCategory, subList };
  },
};
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
