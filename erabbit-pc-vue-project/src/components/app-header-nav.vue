<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <!-- 一级导航 -->
    <li v-for="item in list" :key="item.id" @mousemove="show(item.id)" @mouseleave="hide(item.id)">
      <RouterLink :to="`/category/${item.id}`" @click="hide(item.id)">{{item.name}}</RouterLink>
      <div class="layer" :class="{open:item.open}">
        <!-- 二级导航 -->
        <ul>
          <li
            v-for="sub in item.children"
            :key="sub.id"
          >
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item.id)">
              <img
                :src="sub.picture"
                alt=""
              >
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "AppHeaderNav",
  setup () {
    const store = useStore();
    const list = computed(() => {
      return store.state.category.list;
    });
    // 跳转的时候不会关闭二级类目，通过定义一个数据来控制
    // 1、每个分类（vuex）加上open数据
    // 2、提供显示和隐藏函数，修改open数据
    // 3、组件中使用vuex中的函数，使用事件来绑定
    const show = (id) => {
      store.commit('category/show', id)
    }
    const hide = (id) => {
      store.commit('category/hide', id)
    }
    return { list, show, hide };
  },
};
</script>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      // 显示二级类目
      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }
  }
}
// 二级类目弹层
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
