// 定义分类相关的API接口函数
import request from "@/utils/request";
/**
 * 获取所有分类（顶级、二级、对应的商品推荐）
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
/**
 * 获取顶级类目信息（children属性就是各个子分类）
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
/**
 * 获取二级类目筛选条件数据
 * id 二级类目ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品 （带筛选条件）
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
