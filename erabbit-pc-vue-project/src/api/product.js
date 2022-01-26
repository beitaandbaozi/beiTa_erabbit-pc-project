// 商品详情的api函数
import request from "@/utils/request"
/**
 * @param {String} id -商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
