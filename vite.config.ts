import { loadEnv, type ConfigEnv, type UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { prefix } from './src/config/design'
import { sanitizeFileName } from './vite/sanitizeFileName'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD)
  return {
    base: VITE_BASE_URL,
    build: {
      rollupOptions: {
        output: {
          // https://github.com/vitejs/vite/issues/9119
          sanitizeFileName
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // https://github.com/antfu/unplugin-icons
          // 自动注册图标组件
          IconsResolver()
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 全局公共前缀
            '@prefix-var': prefix
          },
          math: 'strict',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}
