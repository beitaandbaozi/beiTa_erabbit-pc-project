<template>
  <!-- vue2.0需要根元素，vue3.0可以是代码片段 Fragment -->
  <div>App</div>
  <button @click="fn">测试request工具函数</button>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup () {
    const fn = () => {
      // 测试请求
      request('/member/profile', 'get', { a: 10 })
    }
    return { fn }
  }
}
</script>
