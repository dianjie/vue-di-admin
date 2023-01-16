import { isDark } from './useDark'
import { useStyleTag } from '@vueuse/core'
import { useConfigStore } from '@/stores/modules/config'
import { colorDistance, getTextColor, hexToRgb } from './useTopbarTheme'
import { shadeHexColor } from './useComponentTheme'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-menu-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const getHoverBgColor = (hex: string) => {
  const bgColor = hexToRgb(hex)
  const hoverColor = shadeHexColor(hex, 0.1)
  const RGBHoverColor = hexToRgb(hoverColor)
  if (colorDistance(bgColor, RGBHoverColor) < 30) {
    return 'var(--el-color-primary-light-9)'
  } else {
    return hoverColor
  }
}

export const changeMenuTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#434b54'
  } else {
    defaultColor = '#fdfeff'
  }
  if (!color) {
    const configStore = useConfigStore()
    configStore.setMenuTheme(defaultColor)
    changeMenuTheme(defaultColor)
    return
  }
  const lowerCaseColor = color.toLocaleLowerCase()
  if (lowerCaseColor === defaultColor) {
    css.value = ''
    if (isLoaded.value) {
      unload()
    }
    return
  }
  let temp = `--el-menu-bg-color:${lowerCaseColor} !important;--el-menu-text-color:${getTextColor(
    lowerCaseColor
  )} !important;--el-menu-hover-bg-color:${getHoverBgColor(lowerCaseColor)} !important;`
  if (isDark.value) {
    temp = `html.dark{${temp}}`
  } else {
    temp = `:root{${temp}}`
  }
  css.value = temp
  if (!isLoaded.value) {
    load()
  }
}
