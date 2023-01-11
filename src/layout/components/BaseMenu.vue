<template>
  <div :class="classCls">
    <el-menu default-active="2" mode="vertical">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><i-ep-location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><i-ep-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><i-ep-document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><i-ep-setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { computed, inject, unref } from 'vue'

const { prefixCls } = useDesign('menu-wrapper')

const sideMenu = inject<boolean>('sideMenu')

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--default`]: !unref(sideMenu)
  }
])
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-menu-wrapper';

.@{prefix-cls} {
  height: calc(100% - var(--di-header-height));
  width: var(--di-menu-side-width);
  position: fixed;
  left: 0;
  top: var(--di-header-height);
  z-index: 100;
  transform: none;

  &--default,
  &--overlay {
    transform: translate3d(calc(-1 * var(--di-menu-side-width)), 0, 0);
    transition: transform 0.2s;
  }

  &--overlay {
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }

  &--horizontal {
    width: 100%;
    height: var(--di-menu-horizontal-height);
  }
}
</style>
