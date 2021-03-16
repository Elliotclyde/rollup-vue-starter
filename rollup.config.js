import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import alias from "rollup-plugin-alias";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

console.log();

export default {
  input: "src/app.js",
  output: {
    format: "iife",
    file: "dist/bundle.js",
  },
  // ...
  plugins: [
    alias({
      resolve: [".js", ".ts"],
      entries: [
        {
          find: "vue",
          replacement: "node_modules/vue/dist/vue.runtime.esm-bundler.js",
        },
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    vue(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    css({ output: "bundle.css" }),
    process.argv.includes("BUILD:production") ? terser() : null,
  ],
};
