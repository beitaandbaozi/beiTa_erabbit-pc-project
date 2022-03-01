// 通过方法的形式调用组件
//  TODO  import XXXX from  'xxx'

// 1.导入被创建的组件
import XtxConfirm from './xtx-confirm.vue'
import { createVNode, render } from 'vue'

// 3.准备一个dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
  // 返回的是promise对象，点取消销毁组件，点确认销毁组件
  return new Promise((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 点击确认触发的函数
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    // 2.使用createVNode创建虚拟节点
    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    // 4.使用render函数渲染组件到容器
    render(vn, div)
  })
}
