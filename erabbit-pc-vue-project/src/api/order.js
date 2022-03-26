// 订单相关的API

import request from '@/utils/request'
// 结算页面-生成订单
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址
 * @param {Object} form - 参考接口文档
 */
export const addAddress = (form) => {
  return request('/member/address', 'post', form)
}
