import Mock from 'mockjs'

// 基本配置
Mock.setup({
  // 随机延时500-1000毫秒，模拟网络延时
  timeout: '500-1000'
})
// 拦截接口    /my/test
// 1.接口地址路径规则，需要匹配它
// 2.请求方式
// 3.返回数据（函数返回数据）
Mock.mock(/\/my\/test/, 'get', () => {
  // 随机数据的逻辑
  // Mock.mock('@id') ----- 获取随机id
  // Mock.mock('@name') ----- 获取随机名字   cname 中文名字
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname',
    }))
  }
  return { msg: '获取数据成功', result: arr }
})
