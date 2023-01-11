import { defineStore } from 'pinia'

type LanguageType = 'zh-cn' | 'en'
type SizeType = 'large' | 'default' | 'small'

interface ConfigState {
  language: LanguageType
  size: SizeType
  sideMenu: boolean
}

export const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => ({
    language: 'zh-cn',
    size: 'default',
    sideMenu: true
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
    toggleSideMenu() {
      this.setSideMenuConfig(!this.sideMenu)
    }
  },
  persist: true
})
