import { initState } from "./state"

export function initMixin(Vue) { // 给Vue增加init方法
  Vue.prototype._init = function (options) { // 用于初始化操作
    
    let vm = this
    // 将用户传入数据挂在在vue实例中, 方便后续方法获取
    this.$options = options

    // 初始化状态，1、对数据进行劫持
    initState(vm)

  }
}