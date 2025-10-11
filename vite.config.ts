import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy"; //引入插件
import vitePluginImp from "vite-plugin-imp";

import * as path from "path";
import pck from "./package.json";

// const { NODE_ENV } = process.env;
// console.log("process.env.", NODE_ENV);
const outputDir = pck.name;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
        },
      ],
    }),
  ],
  // 配置项目别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 4000,
  },
  base: "./",
  css: {
    preprocessorOptions: {
      // 支持less
      less: {
        javascriptEnabled: true,
      },
    },
  },

  build: {
    outDir: `${outputDir}`,
    sourcemap: true,
    // assetsDir : '' // 默认为assets css等输出目录
    chunkSizeWarningLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      input: {
        // contentJs: path.resolve(__dirname, "./src/contentJs.ts"),
        defaultPopup: path.resolve(__dirname, "defaultPopup.html"),
        optionsPage: path.resolve(__dirname, "optionsPage.html"),
        "src/background": path.resolve(__dirname, "./src/background.ts"),
        "src/contentScriptStart": path.resolve(
          __dirname,
          "./src/contentScriptStart.ts"
        ),
        "src/contentScriptEnd": path.resolve(
          __dirname,
          "./src/contentScriptEnd.ts"
        ),
        // manifest: path.resolve(__dirname, "./manifest.json"),
      },
      output: {
        entryFileNames: "[name].js",
      },
      plugins: [
        copy({
          // verbose: true, // 打出日志
          // hook: "buildEnd", // buildStart、buildEnd、generateBundle、writeBundle
          flatten: false,
          targets: [
            {
              src: "./manifest.json",
              dest: `./${outputDir}`,
              // transform: (contents, filename) =>
              //   contents.toString().replace(/\.\/dist\//g, "./"), // ./dist/ => ./
            },
            {
              src: "./static/**/*",
              dest: `./${outputDir}`,
            },
          ],
        }),
      ],
    },
  },
});
