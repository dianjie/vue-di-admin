<template>
  <div :class="classCls">
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDesign } from '@/hooks/web/useDesign'
import { computed, inject, unref } from 'vue'
import { useConfigStore } from '@/stores/modules/config'
import { storeToRefs } from 'pinia'

const { prefixCls } = useDesign('layout-main')

const sideMenu = inject<boolean>('sideMenu')

const store = useConfigStore()
const { menuModeIsDefault, menuModeIsHorizontal, menuModeIsCollapse } = storeToRefs(store)

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--left-spacing`]: unref(menuModeIsDefault) && unref(sideMenu),
    [`${prefixCls}--horizontal`]: unref(menuModeIsHorizontal),
    [`${prefixCls}--collapse-spacing`]: unref(menuModeIsCollapse)
  }
])
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-layout-main';

.@{prefix-cls} {
  padding-top: var(--di-header-height);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &--left-spacing {
    margin-left: var(--di-menu-side-width);
    transition: margin-left 0.2s;
  }

  &--collapse-spacing {
    margin-left: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
    transition: margin-left 0.2s;
  }

  &--horizontal {
    padding-top: calc(var(--di-header-height) + var(--di-menu-horizontal-height));
  }
}
</style>
