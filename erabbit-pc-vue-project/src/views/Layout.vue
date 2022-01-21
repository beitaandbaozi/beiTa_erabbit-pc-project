<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 吸顶组件 -->
  <AppHeaderStick></AppHeaderStick>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppNavbar from "@/components/app-navbar";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppHeaderStick from "@/components/app-header-sticky"
import { useStore } from "vuex";
export default {
  name: "Layout",
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderStick
  },
  setup () {
    const store = useStore();
    // 获取数据
    store.dispatch('category/getList')
  },
};
</script>

<style lang="less">
.app-body {
  min-height: 600px;
}
</style>
