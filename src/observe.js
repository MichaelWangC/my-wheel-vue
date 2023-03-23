let obj = {name: "123", data: {test: "2222"}}
class Observe {
  constructor(data) {
    this.observe(data)
  }

  observe(obj) {
    if (obj === null || typeof obj !== 'object') return
    Object.keys(obj).forEach(key => this.defineRecative(obj, key, obj[key]))
  }

  defineRecative(obj, key, value) {
    this.observe(value) /// 对所有对象都进行劫持
    Object.defineProperty(obj, key, {
      get() {
        return value
      },
      set(newVal) {
        if (newVal == value) return
        value = newVal
        console.log("数据变化了", newVal)
      }
    })
  }
}

new Observe(obj)
obj.name = "321"
obj.data.test = "432"
