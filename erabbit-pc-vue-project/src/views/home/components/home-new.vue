<template>
  <div class="home-new">
    <HomePanel
      title="新鲜好物"
      sub-title="新鲜出炉 品质靠谱"
    >
      <template v-slot:right>
        <XtxMore></XtxMore>
      </template>
      <!-- 默认插槽 -->
      <div
        ref="target"
        style="position: relative; height: 426px;"
      >
        <Transition name="fade">
          <ul
            class="goods-list"
            v-if="goods.length"
          >
            <li
              v-for="item in goods"
              :key="item.id"
            >
              <RouterLink :to="`/product/${item.id}`">
                <img
                  :src="item.picture"
                  alt=""
                >
                <p class="name ellipsis">{{item.name}}</p>
                <p class="price">&yen;{{item.price}}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton
            bg="#f0f9f4"
            v-else
          ></HomeSkeleton>
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script>
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";
import { ref } from "vue";
import { findNew } from "@/api/home";
import { useLazyData } from "@/hooks";
export default {
  name: "HomeNew",
  components: { HomePanel, HomeSkeleton },
  setup () {
    // const goods = ref([]);
    // findNew().then((data) => {
    //   goods.value = data.result;
    // });
    const target = ref(null);
    const result = useLazyData(target, findNew);

    return { goods: result, target };
  },
};
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
