import { defineStore } from 'pinia'
import type { LanguageType, SizeType, MenuModeType } from '#/config'
import { changeComponentTheme } from '@/hooks/web/useComponentTheme'
import { changeTopbarTheme } from '@/hooks/web/useTopbarTheme'
import { changeMenuTheme } from '@/hooks/web/useMenuTheme'
import { defaultSettings, type ConfigState } from '@/config/design'
import { isDark } from '@/hooks/web/useDark'
import { sidebarFixedChange } from '@/hooks/web/useSidebarFixed'
import { toggleClass } from '@/utils/toggleClass'
import { changeBgColorTheme } from '@/hooks/web/useBgColorTheme'

export const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => {
    return { ...defaultSettings }
  },
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
    menuModeIsCollapse(): boolean {
      return this.menuMode === 'collapse'
    },
    getComponentTheme(): string {
      return this.componentTheme
    },
    getTopbarTheme(): string {
      return this.topbarTheme
    },
    getMenuTheme(): string {
      return this.menuTheme
    },
    getBgColorTheme(): string {
      return this.bgColorTheme
    }
  },
  actions: {
    reset() {
      isDark.value = false
      this.$reset()
      // 恢复自定义主题色
      changeComponentTheme(null)
      // 恢复顶栏主题色
      changeTopbarTheme(null)
      // 恢复菜单主题色
      changeMenuTheme(null)
      // 恢复内容背景主题色
      changeBgColorTheme(null)

      toggleClass(false, 'gray-mode')

      toggleClass(false, 'color-weak')
    },
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
    },
    setTopbarTheme(val: string) {
      this.topbarTheme = val
    },
    setMenuTheme(val: string) {
      this.menuTheme = val
    },
    setBgColorTheme(val: string) {
      this.bgColorTheme = val
    }
  },
  persist: {
    afterRestore: ({ store }) => {
      // 恢复自定义主题色
      changeComponentTheme(store.componentTheme)
      // 恢复顶栏主题色
      changeTopbarTheme(store.topbarTheme)
      // 恢复菜单主题色
      changeMenuTheme(store.menuTheme)
      // 恢复内容背景主题色
      changeBgColorTheme(store.bgColorTheme)
      // 恢复侧边菜单固定
      sidebarFixedChange(store, store.sidebarFixed)

      if (store.grayMode) {
        toggleClass(store.grayMode, 'gray-mode')
        toggleClass(false, 'color-weak')
      }

      if (store.colorWeak) {
        toggleClass(store.colorWeak, 'color-weak')
        toggleClass(false, 'gray-mode')
      }
    }
  }
})
