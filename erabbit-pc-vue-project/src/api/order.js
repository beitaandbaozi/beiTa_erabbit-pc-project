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

/**
 * 修改收货地址
 * @param {Object} form - 参考接口文档
 */
export const editAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form)
}

/**
 * 结算页面-提交订单
 * @param {Object} params - 参考接口文档
 * @returns
 */
export const submitOrder = (params) => {
  return request('/member/order', 'post', params)
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
  return request(`/member/order/${id}`, 'get')
}
/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderList = ({
  orderState,
  page,
  pageSize
}) => {
  return request('/member/order', 'get', {
    orderState,
    page,
    pageSize
  })
}
/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', {
    cancelReason
  })
}
/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const deleteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}
