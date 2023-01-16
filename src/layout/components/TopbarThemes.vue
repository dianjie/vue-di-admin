<template>
  <el-divider>顶栏主题色</el-divider>
  <div
    :class="{
      [`${prefixCls}`]: true,
      [`${prefixCls}--not-custom`]: notCustom
    }"
  >
    <div
      v-for="item in topbarThemes"
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
      <el-color-picker v-model="store.topbarTheme" @change="changeTopbarTheme" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { topbarThemes } from '@/config/design'
import { useDesign } from '@/hooks/web/useDesign'
import { changeTopbarTheme } from '@/hooks/web/useTopbarTheme'
import { useConfigStore } from '@/stores/modules/config'
import { computed, inject, unref } from 'vue'
import type { SizeType } from '#/config'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
const size = inject<SizeType>('size')

const currentTheme = computed(() => store.getTopbarTheme)

const notCustom = computed(() => {
  const findIndex = topbarThemes.findIndex(
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
  store.setTopbarTheme(color)
  changeTopbarTheme(color)
}
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-theme-color';

.@{prefix-cls} {
  :deep(.el-color-picker .el-color-picker__icon) {
    color: var(--di-header-text-color);
  }
}
</style>
