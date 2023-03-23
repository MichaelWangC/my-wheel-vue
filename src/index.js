import { initMixin } from "./init"


function Vue(options) {
  this._init(options)
}

initMixin(Vue) // 扩展init方法，封装initMixin避免在Vue中增加过多的函数，方便扩展，保证代码可读性

export default Vue