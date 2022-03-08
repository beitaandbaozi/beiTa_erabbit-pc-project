// 封装购物车相关的API函数
import request from '@/utils/request'
/**
 * 获取商品的 最新价格  库存  是否有效
 * @param {String} skuId -SKU id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据
 * @param {String} skuId -SKU id
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {Array<object>} cartList -购物车信息列表
 * @param {String} object.skuId -SKUID
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count -数量
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取购物车列表
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} skuId -SKUID
 * @param {Integer} count -数量
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}
