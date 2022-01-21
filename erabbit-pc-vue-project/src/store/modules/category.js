// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖topCategory重新设置，保证初始化就有数据，不至于白屏
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类
  mutations: {
    setList (state, payload) {
      state.list = payload
    }
  },
  // 向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
