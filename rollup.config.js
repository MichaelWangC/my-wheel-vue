
import babel from "@rollup/plugin-babel"

export default {
  input: './src/index.js',
  output: {
    file: './dist/vue.js',
    name: "Vue",  // 添加全局 gloabel.Vue
    format: 'umd', // esm es6模块    commonjs模块    life自执行函数   umd 支持amd和commonjs模块
    sourcemap:true // 可以调试源代码
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // 排除 node_modules
    })
  ]
};