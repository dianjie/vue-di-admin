import type { LanguageType, SizeType, MenuModeType } from '#/config'
export interface ConfigState {
  language: LanguageType
  size: SizeType
  sideMenu: boolean
  menuMode: MenuModeType
  componentTheme: string
  topbarTheme: string
  menuTheme: string
  bgColorTheme: string
  sidebarFixed: boolean
  grayMode: boolean
  colorWeak: boolean
}

export const defaultSettings: ConfigState = {
  language: 'zh-cn',
  size: 'default',
  sideMenu: true,
  menuMode: 'default',
  componentTheme: '#409EFF',
  topbarTheme: '#FFFFFF',
  menuTheme: '#FDFEFF',
  bgColorTheme: '#F0F2F5',
  sidebarFixed: false,
  grayMode: false,
  colorWeak: false
}

// css 前缀
export const prefix = 'di'

export const themes = [
  { name: 'default', color: '#409EFF' },
  { name: 'pink', color: '#E91E63' },
  { name: 'purple', color: '#9C27B0' },
  { name: 'deeppurple', color: '#673AB7' },
  { name: 'blue', color: '#2196F3' },
  { name: 'lightblue', color: '#03A9F4' },
  { name: 'cyan', color: '#00BCD4' },
  { name: 'teal', color: '#009688' },
  { name: 'green', color: '#4CAF50' },
  { name: 'lightgreen', color: '#8BC34A' },
  { name: 'lime', color: '#CDDC39' },
  { name: 'yellow', color: '#FFEB3B' },
  { name: 'amber', color: '#FFC107' },
  { name: 'orange', color: '#FF9800' },
  { name: 'deeporange', color: '#FF5722' },
  { name: 'brown', color: '#795548' }
]

export const topbarThemes = [
  { name: 'white', color: '#FFFFFF' },
  { name: 'lightblue', color: '#2E88FF' },
  { name: 'dark', color: '#151515' },
  { name: 'blue', color: '#1565C0' },
  { name: 'deeppurple', color: '#4527A0' },
  { name: 'purple', color: '#6A1B9A' },
  { name: 'pink', color: '#AD1457' },
  { name: 'cyan', color: '#0097A7' },
  { name: 'teal', color: '#00796B' },
  { name: 'green', color: '#43A047' },
  { name: 'lightgreen', color: '#689F38' },
  { name: 'lime', color: '#AFB42B' },
  { name: 'yellow', color: '#FBC02D' },
  { name: 'amber', color: '#FFA000' },
  { name: 'orange', color: '#FB8C00' },
  { name: 'deeporange', color: '#D84315' },
  { name: 'brown', color: '#5D4037' },
  { name: 'grey', color: '#616161' },
  { name: 'bluegrey', color: '#546E7A' },
  { name: 'indigo', color: '#3F51B5' }
]

export const menuThemes = [
  { name: 'light', color: '#FDFEFF' },
  { name: 'dark', color: '#151515' },
  { name: 'indigo', color: '#1A237E' },
  { name: 'bluegrey', color: '#37474F' },
  { name: 'brown', color: '#4E342E' },
  { name: 'cyan', color: '#006064' },
  { name: 'green', color: '#2E7D32' },
  { name: 'deeppurple', color: '#4527A0' },
  { name: 'deeporange', color: '#BF360C' },
  { name: 'pink', color: '#880E4F' },
  { name: 'purple', color: '#6A1B9A' },
  { name: 'teal', color: '#00695C' }
]

export const bgColorThemes = [
  { name: 'light', color: '#F0F2F5' },
  { name: 'dark', color: '#2A2C2C' }
]
