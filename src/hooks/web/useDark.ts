import { useDark, useToggle } from '@vueuse/core'
import { changeComponentTheme } from './useComponentTheme'
import { useConfigStore } from '@/stores/modules/config'

export const isDark = useDark()
export const toggleDark = () => {
  useToggle(isDark)
  const configStore = useConfigStore()
  changeComponentTheme(configStore.getComponentTheme)
}
