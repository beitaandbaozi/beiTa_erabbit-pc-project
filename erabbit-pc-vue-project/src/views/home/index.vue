<template>
  <!-- 首页入口（分类+广告） -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- vue 动画 -->
  <button @click="show=true">显示</button>
  <button @click="show=false">隐藏</button>
  <Transition>
    <div
      class="box"
      v-show="show"
    ></div>
  </Transition>
  <Transition name="beiTa">
    <div
      class="box"
      v-show="show"
    ></div>
  </Transition>

</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import { ref } from "vue";
export default {
  name: "HomePages",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
  },
  setup () {
    const show = ref(true);
    return { show };
  },
};
</script>

<style scoped lang='less'>
.box {
  width: 50px;
  height: 50px;
  background-color: red;
}
// 使用Transition组件实现动画，一个元素或者组件的（显示|隐藏，创建|移除）
/**
 * 进入前 v-enter (vue2)  v-enter-form
 * 进入中 v-enter-active
 * 进入后 v-enter-to
 */
/**
 * 离开前  v-leave（vue2） v-leave-form
 * 离开中  v-leave-active
 * 离开后  v-leave-to
 */
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 2s;
}
.v-leave-to {
  opacity: 0;
}
.beiTa-enter-from {
  height: 0;
}
.beiTa-enter-active {
  transition: all 2s;
}
.beiTa-enter-to {
  height: 100px;
}
.beiTa-leave-from {
  height: 100px;
}
.beiTa-leave-active {
  transition: all 2s;
}
.beiTa-leave-to {
  height: 0;
}
//  需求：一个盒子再显示隐藏的时候做淡入淡出动画
</style>
