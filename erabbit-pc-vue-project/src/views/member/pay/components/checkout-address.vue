<template>
  <div class="checkout-address">
    <div class="text">
      <div
        v-if="!showAddress"
        class="none"
      >您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i />货<i />人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation}}{{showAddress.address}}</li>
      </ul>
      <a
        v-if="showAddress"
        href="javascript:;"
        @click="openAddressEdit(showAddress)"
      >修改地址</a>
    </div>
    <div class="action">
      <XtxButton
        class="btn"
        @click="openDialog()"
      >切换地址</XtxButton>
      <XtxButton
        class="btn"
        @click="openAddressEdit({})"
      >添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件:切换收货地址 -->
  <XtxDialog
    title="切换收货地址"
    v-model:visible="visibleDialog"
  >
    <div
      @click="selectedAddress = item"
      :class="{active:selectedAddress&&selectedAddress.id===item.id}"
      class="text item"
      v-for="item in list"
      :key="item.id"
    >
      <ul>
        <li><span>收<i />货<i />人：</span>{{item.receiver}}</li>
        <li><span>联系方式：</span>{{item.contact.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
      </ul>
    </div>
    <!-- vue3.0 仅支持v-slot+template写法 -->
    <template v-slot:footer>
      <XtxButton
        type="gray"
        style="margin-right:20px"
        @click="visibleDialog=false"
      >取消</XtxButton>
      <XtxButton
        type="primary"
        @click="confirmAddress"
      >确认</XtxButton>
    </template>
  </XtxDialog>
  <!-- 添加编辑组件：添加地址 -->
  <AddressEdit
    ref="addressCom"
    @on-success="successHandler"
  ></AddressEdit>
</template>
<script>
import { ref } from "vue";
import AddressEdit from "./address-edit.vue";
export default {
  name: "CheckoutAddress",
  components: { AddressEdit },
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => [],
    },
  },
  // 1.在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
  // 2.如果是组件渲染的代码片段，vue3中规范，需要在emits中声明所触发的自定义事件
  // 3.提倡：有自定义事件，需要在emits选项中声明
  emits: ["change"],
  setup (props, { emit }) {
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，使用第一条收货地址
    // 3. 如果没有数据，提示添加
    const showAddress = ref(null);
    const defaultAddress = props.list.find((item) => item.isDefault === 0);
    if (defaultAddress) {
      showAddress.value = defaultAddress;
    } else {
      if (props.list.length) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0];
      }
    }

    // 通知父组件一个收货地址ID
    emit("change", showAddress.value && showAddress.value.id);

    // 显示与隐藏对话框
    const visibleDialog = ref(false);
    // 记录当前选中地址ID
    const selectedAddress = ref(null);
    // 点击确定时
    const confirmAddress = () => {
      // 1.显示的地址换成选中的地址
      showAddress.value = selectedAddress.value;
      // 2.把选中的地址ID通知结算组件
      emit("change", selectedAddress.value.id && selectedAddress.value.id);
      // 3.关闭对话框
      visibleDialog.value = false;
    };

    // 打开对话框的时候
    const openDialog = () => {
      // 数据清空以便清除点击效果
      selectedAddress.value = null;
      visibleDialog.value = true;
    };

    // 打开添加地址对话框
    const addressCom = ref(null);
    const openAddressEdit = (address) => {
      // 添加传得是 {}  修改的时候传的是 数据
      addressCom.value.open(address);
    };

    const successHandler = (formData) => {
      // 查找id，如果本来就是存在的  说明是修改  否则是 添加
      const address = props.list.find((item) => item.id === formData.id);
      if (address) {
        for (const key in address) {
          address[key] = formData[key];
        }
      } else {
        // 如果是添加：往list中追加一条
        // 当你在修改formData的时候，数组中的数据也会更新，因为是同一引用地址。
        // 啥时候修改formData，当你打开对话框需要清空之前的输入信息
        // 克隆formData数据
        const jsonStr = JSON.stringify(formData);
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr));
      }
    };
    return {
      showAddress,
      visibleDialog,
      selectedAddress,
      confirmAddress,
      openDialog,
      addressCom,
      openAddressEdit,
      successHandler,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
