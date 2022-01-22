// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了vue构造函数，vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了App,vue基础上扩展
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive
    // 挂载原型： app.config.globalProperties方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
  }
}
