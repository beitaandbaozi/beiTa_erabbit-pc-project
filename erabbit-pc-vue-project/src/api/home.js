// 提供首页相关API函数
import request from '@/utils/request'
// 获取品牌数据
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
// 获取广告数据（轮播数据）
export const findBanner = () => {
  return request('/home/banner', 'get')
}
// 获取新鲜好物数据
export const findNew = () => {
  return request('/home/new', 'get')
}
