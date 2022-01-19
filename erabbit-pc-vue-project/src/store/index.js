import { createStore } from 'vuex'

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

// 引入持久化插件
import createPersistedState from 'vuex-persistedstate'

//  vue2.0 创建仓库 new Vuex.Store({})
//  vue3.0 创建仓库 createStore({})
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage上
    // 修改state后触发才可以看到本地存储数据的的变化
    createPersistedState({
      // 本地存储的名字
      key: 'beiTa-erabbit-client',
      // 存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token
      paths: ['user', 'cart']
    })
  ]
})
