<template>
  <div
    class="xtx-city"
    ref="target"
  >
    <div
      class="select"
      @click="toggle"
      :class="{active:visible}"
    >
      <span
        class="placeholder"
        v-if="!fullLocation"
      >{{placeholder}}</span>
      <span
        class="value"
        v-else
      >{{fullLocation}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div
      class="option"
      v-if="visible"
    >
      <div
        v-if="loading"
        class="loading"
      ></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          @click="changeItem(item)"
        >{{item.name}}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, computed, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
export default {
  name: "XtxCity",
  props: {
    fullLocation: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: '请选择配送地址'
    }
  },
  setup (props, { emit }) {
    // 显示和隐藏数据
    const visible = ref(false);
    // 城市数据
    const allCityData = ref([]);
    // 数据加载状态
    const loading = ref(false);
    // 提供打开和关闭的行为方法
    const open = () => {
      visible.value = true;
      // 获取城市数据
      loading.value = true;
      getCityData().then((data) => {
        allCityData.value = data;
        loading.value = false;
      });
      // 清空之前选中地址
      for (const key in changeResult) {
        changeResult[key] = "";
      }
    };
    const close = () => {
      visible.value = false;
    };
    // 提供一个切换函数给select使用
    const toggle = () => {
      visible.value ? close() : open();
    };

    // 元素外部实现点击时 关闭城市列表
    const target = ref(null);
    onClickOutside(target, () => {
      // 参数1：监听元素
      // 参数2：点了了该元素外的其他地方触发的函数
      close();
    });

    // 实现计算属性： 获取当前显示的地区数组
    const currList = computed(() => {
      // 默认显示省一级
      let list = allCityData.value;
      // 可能：市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((p) => p.code === changeResult.provinceCode).areaList;
      }
      // 可能：县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((c) => c.code === changeResult.cityCode).areaList;
      }
      return list;
    });

    // 定义选择的 省市区 数据
    const changeResult = reactive({
      // 省
      provinceCode: "",
      provinceName: "",
      // 市
      cityCode: "",
      cityName: "",
      // 地区
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });
    // 当点击地区时,记录
    const changeItem = (item) => {
      if (item.level === 0) {
        // 省
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      } else if (item.level === 1) {
        // 市
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      } else if (item.level === 2) {
        // 地区
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        // 这是最后一级，选完了，关闭对话框，通知父组件数据更新
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        close();
        emit("change", changeResult);
      }
    };
    return { visible, toggle, target, loading, currList, changeItem };
  },
};
// 获取省市区数据函数
const getCityData = () => {
  // 获取城市数据
  // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 2. 当本地没有缓存，发请求获取数据
  // 3. 当本地有缓存，取出本地数据
  // 返回promise在then获取数据，这里可能是异步操作可能同步操作
  return new Promise((resolve, reject) => {
    // 约定：数据存储在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res) => {
        // 进行缓存
        window.cityData = res.data;
        resolve(res.data);
      });
    }
  });
};
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
