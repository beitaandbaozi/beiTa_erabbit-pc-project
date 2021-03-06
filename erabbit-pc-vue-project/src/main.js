import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自己的UI组件库
import UI from '@/components/library'

// 引入重置样式包
import 'normalize.css'
// 引入自己项目的重置样式和公用样式
import '@/assets/styles/common.less'
// 引入mock
import '@/mock'

createApp(App).use(store).use(router).use(UI).mount('#app')
