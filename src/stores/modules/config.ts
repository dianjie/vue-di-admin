import { defineStore } from 'pinia'
import type { LanguageType, SizeType, MenuModeType } from '#/config'
import { changeComponentTheme } from '@/hooks/web/useComponentTheme'
interface ConfigState {
  language: LanguageType
  size: SizeType
  sideMenu: boolean
  menuMode: MenuModeType
  componentTheme: string
}

export const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => ({
    language: 'zh-cn',
    size: 'default',
    sideMenu: true,
    menuMode: 'default',
    componentTheme: '#409EFF'
  }),
  getters: {
    getLanguageConfig(): LanguageType {
      return this.language
    },
    getSizeConfig(): SizeType {
      return this.size
    },
    getSideMenuConfig(): boolean {
      return this.sideMenu
    },
    getMenuModeConfig(): MenuModeType {
      return this.menuMode
    },
    menuModeIsDefault(): boolean {
      return this.menuMode === 'default'
    },
    menuModeIsOverlay(): boolean {
      return this.menuMode === 'overlay'
    },
    menuModeIsHorizontal(): boolean {
      return this.menuMode === 'horizontal'
    },
    getComponentTheme(): string {
      return this.componentTheme
    }
  },
  actions: {
    setLanguageConfig(val: LanguageType) {
      this.language = val
    },
    setSizeConfig(val: SizeType) {
      this.size = val
    },
    setSideMenuConfig(val: boolean) {
      this.sideMenu = val
    },
    setMenuModeConfig(val: MenuModeType) {
      this.menuMode = val
    },
    toggleSideMenu() {
      this.setSideMenuConfig(!this.sideMenu)
    },
    setComponentTheme(val: string) {
      this.componentTheme = val
    }
  },
  persist: {
    afterRestore: ({ store }) => {
      // 恢复自定义主题色
      changeComponentTheme(store.componentTheme)
    }
  }
})
