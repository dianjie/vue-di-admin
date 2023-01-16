import { isDark } from './useDark'
import { useStyleTag } from '@vueuse/core'
import { useConfigStore } from '@/stores/modules/config'

// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#stackoverflow-archive-begin
export const shadeHexColor = (color: string, percent: number) => {
  const f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  )
}

const setPropertyPrimary = (mode: string, i: number, color: string) => {
  return `--el-color-primary-${mode}-${i}:${shadeHexColor(
    color,
    isDark.value ? -(i / 10) : i / 10
  )};`
}

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-component-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const changeComponentTheme = (color: string | null) => {
  const defaultColor = '#409eff'
  if (!color) {
    const configStore = useConfigStore()
    configStore.setComponentTheme(defaultColor)
    changeComponentTheme(defaultColor)
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
  let temp = `--el-color-primary:${lowerCaseColor};`
  for (let i = 1; i <= 2; i++) {
    temp += setPropertyPrimary('dark', i, color)
  }
  for (let i = 1; i <= 9; i++) {
    temp += setPropertyPrimary('light', i, color)
  }
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
