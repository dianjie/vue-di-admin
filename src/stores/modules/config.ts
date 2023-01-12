import { defineStore } from 'pinia'
import type { LanguageType, SizeType, MenuModeType } from '#/config'
interface ConfigState {
  language: LanguageType
  size: SizeType
  sideMenu: boolean
  menuMode: MenuModeType
}

export const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => ({
    language: 'zh-cn',
    size: 'default',
    sideMenu: true,
    menuMode: 'default'
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
    }
  },
  persist: true
})
