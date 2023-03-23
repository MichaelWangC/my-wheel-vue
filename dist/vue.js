(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);
      // 遍历data属性
      this.walk(data);
    }
    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          // 重新定义属性
          defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observe;
  }();
  function defineReactive(data, key, value) {
    observe(value); // 递归处理，对属性的所有数据进行劫持

    // 使用defineProperty 重新定义数据，所以性能比较差，劫持数据响应式变化
    // defineProperty只能劫持已存在的属性；所以如果属性被删除或者新增，需要使用Vue的其他方法，$set $delete
    Object.defineProperty(data, key, {
      get: function get() {
        console.log("get val");
        return value;
      },
      set: function set(newVal) {
        if (newVal === value) return;
        value = newVal;
        console.log("set val");
      }
    });
  }
  function observe(data) {
    // 劫持对象属性
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }
    return new Observe(data);
  }

  function initState(vm) {
    var opts = vm.$options;
    // 对数据进行劫持
    if (!!opts.data) {
      initData(vm);
    }
  }
  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key];
      },
      set: function set(newVal) {
        vm[target][key] = newVal;
      }
    });
  }
  function initData(vm) {
    var data = vm.$options.data;

    // data可能是函数或者对象，vue3中确定需要为对象；    data.call 的入参？
    data = typeof data === "function" ? data.call(vm) : data;
    vm._data = data;

    // 监听劫持data，实现响应式原理 defineProperty
    observe(data);

    // 对vm._data 进行代理，vm可以直接访问数据
    for (var key in data) {
      proxy(vm, "_data", key);
    }
  }

  function initMixin(Vue) {
    // 给Vue增加init方法
    Vue.prototype._init = function (options) {
      // 用于初始化操作

      var vm = this;
      // 将用户传入数据挂在在vue实例中, 方便后续方法获取
      this.$options = options;

      // 初始化状态，1、对数据进行劫持
      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); // 扩展init方法，封装initMixin避免在Vue中增加过多的函数，方便扩展，保证代码可读性

  return Vue;

}));
//# sourceMappingURL=vue.js.map
