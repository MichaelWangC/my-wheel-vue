import { observe } from "./observe/index"

export function initState(vm) {
  const opts = vm.$options
  // 对数据进行劫持
  if (!!opts.data) {
    initData(vm)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newVal) {
      vm[target][key] = newVal
    }
  })
}

function initData(vm) {
  let data = vm.$options.data
   
  // data可能是函数或者对象，vue3中确定需要为对象；    data.call 的入参？
  data = typeof data === "function"?data.call(vm):data

  vm._data = data

  // 监听劫持data，实现响应式原理 defineProperty
  observe(data)

  // 对vm._data 进行代理，vm可以直接访问数据
  for (const key in data) {
    proxy(vm, "_data", key)
  }
  
}