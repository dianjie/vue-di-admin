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

const { prefixCls } = useDesign('layout-main')

const sideMenu = inject<boolean>('sideMenu')

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--left-spacing`]: unref(sideMenu)
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
}
</style>
