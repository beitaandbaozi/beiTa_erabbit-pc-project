<template>
  <XtxDialog
    title="添加收货地址"
    v-model:visible="visibleDialog"
  >
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              class="input"
              placeholder="请输入收货人"
              v-model="formData.receiver"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              class="input"
              placeholder="请输入手机号"
              v-model="formData.contact"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              placeholder="请选择所在地区"
              @change="changeCity"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              class="input"
              placeholder="请输入详细地址"
              v-model="formData.address"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              class="input"
              placeholder="请输入邮政编码"
              v-model="formData.postalCode"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              class="input"
              placeholder="请输入地址标签，逗号分隔"
              v-model="formData.addressTags"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton
        type="gray"
        style="margin-right:20px"
        @click="visibleDialog = false"
      >取消</XtxButton>
      <XtxButton
        type="primary"
        @click="submit"
      >确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { reactive, ref } from "vue";
import { addAddress } from "@/api/order";
import Message from "@/components/library/Message";
export default {
  name: "AddressEdit",
  setup (props, { emit }) {
    const visibleDialog = ref(false);
    // 定义一个open函数，作为打开对话框函数（组件实例拥有open函数）
    const open = () => {
      visibleDialog.value = true;
      // 清空表单
      for (const key in formData) {
        if (key === "isDefault") {
          formData[key] = 1;
        } else {
          formData[key] = null;
        }
      }
    };
    // 定义表单数据对象
    const formData = reactive({
      receiver: "",
      contact: "",
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      address: "",
      postalCode: "",
      addressTags: "",
      isDefault: 1,
      // 城市组件显示文字（完整行政区地址）
      fullLocation: "",
    });
    // 选择城市
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode;
      formData.cityCode = result.cityCode;
      formData.countyCode = result.countyCode;
      formData.fullLocation = result.fullLocation;
    };
    // 提交操作
    const submit = () => {
      // 1.表单校验 --------- 回南天 不写了  下次一定写
      // 2.连接接口
      addAddress(formData).then((data) => {
        // 添加成功
        Message({ text: "添加收货地址成功", type: "success" });
        formData.id = data.result.id;
        visibleDialog.value = false;
        emit("on-success", formData);
      });
    };
    return { visibleDialog, open, formData, changeCity, submit };
  },
};
</script>
<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
