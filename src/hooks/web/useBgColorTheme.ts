import { isDark } from './useDark'
import { useStyleTag } from '@vueuse/core'
import { useConfigStore } from '@/stores/modules/config'

const { css, load, unload, isLoaded } = useStyleTag('', { id: 'global-content-theme' })
// 先卸载，后面再加载，保证能覆盖默认的
unload()

export const changeBgColorTheme = (color: string | null) => {
  let defaultColor = ''
  if (isDark.value) {
    defaultColor = '#2A2C2C'
  } else {
    defaultColor = '#F0F2F5'
  }
  if (!color) {
    const configStore = useConfigStore()
    configStore.setBgColorTheme(defaultColor)
    changeBgColorTheme(defaultColor)
    return
  }
  const lowerCaseColor = color.toLocaleLowerCase()
  let temp = `--di-content-bg-color:${lowerCaseColor};`
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
