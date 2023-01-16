<template>
  <el-divider>组件主题色</el-divider>
  <div
    :class="{
      [`${prefixCls}`]: true,
      [`${prefixCls}--not-custom`]: notCustom
    }"
  >
    <div
      v-for="item in themes"
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
      <el-color-picker v-model="store.componentTheme" @change="changeComponentTheme" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { themes } from '@/config/design'
import { useDesign } from '@/hooks/web/useDesign'
import { changeComponentTheme } from '@/hooks/web/useComponentTheme'
import { useConfigStore } from '@/stores/modules/config'
import { computed, inject, unref } from 'vue'
import type { SizeType } from '#/config'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
const size = inject<SizeType>('size')

const currentTheme = computed(() => store.getComponentTheme)

const notCustom = computed(() => {
  const findIndex = themes.findIndex(
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
  store.setComponentTheme(color)
  changeComponentTheme(color)
}
</script>

<style lang="less" scoped></style>
