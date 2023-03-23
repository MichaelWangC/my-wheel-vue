(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function initMixin(Vue) {
    // 给Vue增加init方法
    Vue.prototype._init = function (options) {// 用于初始化操作
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); // 扩展init方法，封装initMixin避免在Vue中增加过多的函数，方便扩展，保证代码可读性

  return Vue;

}));
//# sourceMappingURL=vue.js.map
