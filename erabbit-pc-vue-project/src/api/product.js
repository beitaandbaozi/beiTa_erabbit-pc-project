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
/**
 * @param {Integer} id -商品ID
 * @param {Integer} limit -商品数量
 * @param {Integer} type -热销类型，1为24小时，2为周榜，3为总榜，默认为1
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
