import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueRouter from 'unplugin-vue-router/vite';
import Layouts from 'vite-plugin-vue-layouts';

import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
// 这里使用的是 unplugin-vue-router 而不是 vue-router
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Components from 'unplugin-vue-components/vite';

import { viteMockServe } from 'vite-plugin-mock';

import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }),
    vue(),
    vueJsx(),
    Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件
      defaultLayout: 'default', // 指定默认布局
      pagesDirs: 'src/views', // 指定页面文件
    }),

    UnoCSS(),

    AutoImport({
      // targets to transform (哪些文件需要解析)
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register (全局需要注册的内容)
      imports: [
        'vue',
        // 这里使用的是 unplugin-vue-router 而不是 vue-router
        // 要使用我们选择的自动路由方案
        VueRouterAutoImports,
        // VueUse 配置自动导入
        '@vueuse/core',
      ],
    }),

    Components(),

    viteMockServe({
      // default
      mockPath: 'mock',
      enable: true,
    }),

    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Vite APP',
        short_name: 'Vite APP',
        description: 'Vite App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
