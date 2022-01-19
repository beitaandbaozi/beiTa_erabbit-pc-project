<template>
<!-- vue2.0需要根元素，vue3.0可以是代码片段 Fragment -->
  <div>App {{$store.state.user.profile.account}}</div>
  <button @click="$store.commit('user/setUser',{account:'beiTa'})">修改用户信息</button>
</template>
