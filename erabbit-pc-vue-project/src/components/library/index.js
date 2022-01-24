// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了vue构造函数，vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了App,vue基础上扩展
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more'
import XtxBread from './xtx-bread'
import XtxBreadItem from './xtx-bread-item.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive
    // 挂载原型： app.config.globalProperties方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    // 定义指令
    defineDirective(app)
  }
}
// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将存储图片地址设置给图片元素
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted (el, binding) {
      // a.创建观察对象 来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // b.把指令的值设置给el的src属性
          // c.处理图片加载失败时=====> 设置默认图片  errir图片加载失败时间  load 图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图
            el.src = defaultImg
          }
          el.src = binding.value
        }
      },
      {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
