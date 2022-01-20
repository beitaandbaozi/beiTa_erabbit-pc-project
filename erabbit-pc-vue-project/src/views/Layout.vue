<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部组件 -->
  <footer>底部组件</footer>
</template>

<script>
import AppNavbar from "@/components/app-navbar";
import AppHeader from "@/components/app-header";
export default {
  name: "Layout",
  components: {
    AppNavbar,
    AppHeader
  },
};
</script>

<style lang="less">
</style>
