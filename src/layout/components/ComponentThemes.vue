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
      @click="handleChangeTheme(item.color)"
    >
      <div :class="blockCls">
        <div :class="`${prefixCls}-block__inner`" :style="{ 'background-color': item.color }"></div>
      </div>
    </div>
    <el-color-picker v-model="store.componentTheme" @change="changeComponentTheme" />
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

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-theme-color';

.@{prefix-cls} {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-right: -10px;
  margin-left: -10px;
  margin-top: -10px;

  :deep(.el-color-picker__color) {
    border-color: transparent !important;
  }

  &--not-custom {
    :deep(.el-color-picker__trigger) {
      border-color: transparent !important;
    }
  }

  &-item {
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 4px;

    &--small {
      height: 24px;
      width: 24px;
    }

    &--default {
      height: 32px;
      width: 32px;
    }

    &--large {
      height: 40px;
      width: 40px;
    }

    &--active {
      border: 1px solid var(--el-border-color);
    }
  }

  &-block {
    padding: 5px;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;

    &__inner {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
