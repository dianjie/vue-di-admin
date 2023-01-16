<template>
  <el-divider>菜单主题色</el-divider>
  <div
    :class="{
      [`${prefixCls}`]: true,
      [`${prefixCls}--not-custom`]: notCustom
    }"
  >
    <div
      v-for="item in menuThemes"
      :class="{
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item--active`]:
          currentTheme.toLocaleLowerCase() === item.color.toLocaleLowerCase(),
        [`${prefixCls}-item--${unref(size)}`]: true
      }"
      :key="item.name"
      :title="item.name"
      @click="handleChangeTheme(item.color)"
    >
      <div :class="blockCls">
        <div :class="`${prefixCls}-block__inner`" :style="{ 'background-color': item.color }"></div>
      </div>
    </div>
    <div title="custom">
      <el-color-picker v-model="store.menuTheme" @change="changeMenuTheme" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuThemes } from '@/config/design'
import { useDesign } from '@/hooks/web/useDesign'
import { changeMenuTheme } from '@/hooks/web/useMenuTheme'
import { useConfigStore } from '@/stores/modules/config'
import { computed, inject, unref } from 'vue'
import type { SizeType } from '#/config'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
const size = inject<SizeType>('size')

const currentTheme = computed(() => store.getMenuTheme)

const notCustom = computed(() => {
  const findIndex = menuThemes.findIndex(
    (item) => item.color.toLocaleLowerCase() === unref(currentTheme).toLocaleLowerCase()
  )
  return findIndex !== -1
})

const blockCls = computed(() => [
  {
    [`${prefixCls}-block`]: true
  }
])

const handleChangeTheme = (color: string) => {
  store.setMenuTheme(color)
  changeMenuTheme(color)
}
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-theme-color';

.@{prefix-cls} {
  :deep(.el-color-picker .el-color-picker__icon) {
    color: var(--el-menu-text-color);
  }
}
</style>
