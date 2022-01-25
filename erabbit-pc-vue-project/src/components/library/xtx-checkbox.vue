<template>
  <div
    class="xtx-checkbox"
    @click="changeChecked()"
  >
    <i
      class="iconfont icon-checked"
      v-if="checked"
    ></i>
    <i
      class="iconfont icon-unchecked"
      v-else
    ></i>
    <!-- 判断插槽内容是否存在 -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>
<script>
import { ref, watch } from "vue";
// v-model ====> :modelValue + @update:modelValue
export default {
  name: "XtxCheckbox",
  props: {
    // 判断是否选中
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup (props, { emit }) {
    const checked = ref(false);
    // 改变选项状态
    const changeChecked = () => {
      checked.value = !checked.value;
      // 使用emit通知父组件数据的改变
      emit("update:modelValue", checked.value);
    };
    // 使用监听器，将父组件传递过来的数据赋值给checked数据
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      },
      { immediate: true }
    );
    return { checked, changeChecked };
  },
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>