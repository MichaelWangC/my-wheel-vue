
class Observe {
  constructor(data) {
    // 遍历data属性
    this.walk(data)
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      // 重新定义属性
      defineReactive(data, key, data[key])
    })
  }
}

export function defineReactive(data, key, value) {

  observe(value) // 递归处理，对属性的所有数据进行劫持

  // 使用defineProperty 重新定义数据，所以性能比较差，劫持数据响应式变化
  // defineProperty只能劫持已存在的属性；所以如果属性被删除或者新增，需要使用Vue的其他方法，$set $delete
  Object.defineProperty(data, key, {
    get() {
      console.log("get val")
      return value
    },
    set(newVal) {
      if (newVal === value) return
      value = newVal
      console.log("set val")
    }
  })
}

export function observe(data) {
  // 劫持对象属性
  if (typeof data !== 'object' || data == null) {
    return
  }

  return new Observe(data)

}