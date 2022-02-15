// 商品详情的api函数
import request from "@/utils/request"
/**
 * @param {String} id -商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
/**
 * @param {String} id -商品ID 传入相关推荐，不传猜你喜欢
 * @param {Integer} limit -商品数量
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}
