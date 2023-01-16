import { isDark } from './useDark'
import { useStyleTag } from '@vueuse/core'
import { useConfigStore } from '@/stores/modules/config'
import { shadeHexColor } from './useComponentTheme'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-topbar-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

type rgbType = {
  r: number
  g: number
  b: number
} | null

const hexToRgb = (hex: string): rgbType => {
  // turn hex val to RGB
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

// https://www.zhangxinxu.com/wordpress/2021/06/js-image-colorful-or-pure/
const colorDistance = (RGB1: rgbType, RGB2: rgbType) => {
  if (!RGB1 || !RGB2) return 0
  const { r: r1, g: g1, b: b1 } = RGB1
  const { r: r2, g: g2, b: b2 } = RGB2
  const rmean = (r1 + r2) / 2

  const r = r1 - r2
  const g = g1 - g2
  const b = b1 - b2

  return Math.sqrt((2 + rmean / 256) * r * r + 4 * g * g + (2 + (255 - rmean) / 256) * b * b)
}

const getTextColor = (hex: string) => {
  const bgColor = hexToRgb(hex)
  const textColor = shadeHexColor(hex, 0.95)
  const RGBTextColor = hexToRgb(textColor)
  // 颜色接近
  if (colorDistance(bgColor, RGBTextColor) < 100) {
    return '#303133'
  } else {
    return textColor
  }
}

export const changeTopbarTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#151515'
  } else {
    defaultColor = '#FFFFFF'
  }
  if (!color) {
    const configStore = useConfigStore()
    configStore.setTopbarTheme(defaultColor)
    changeTopbarTheme(defaultColor)
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
  let temp = `--di-header-bg-color:${lowerCaseColor};--di-header-text-color:${getTextColor(
    lowerCaseColor
  )};`
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
