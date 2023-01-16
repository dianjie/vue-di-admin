import { useDark, useToggle } from '@vueuse/core'
import { changeComponentTheme } from './useComponentTheme'
import { changeTopbarTheme } from './useTopbarTheme'
import { changeMenuTheme } from './useMenuTheme'
import { useConfigStore } from '@/stores/modules/config'

export const isDark = useDark()
export const toggleDark = () => {
  useToggle(isDark)
  const configStore = useConfigStore()
  changeComponentTheme(configStore.getComponentTheme)
  // 重置回默认的
  changeTopbarTheme(null)
  changeMenuTheme(null)
}
