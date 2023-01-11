<template>
  <header :class="headerCls">
    <div :class="`${prefixCls}-logo`">
      <h1 :class="`${prefixCls}-logo__title`">Di Admin</h1>
      <el-button class="side-menu-handle" type="warning" circle @click="toggleSideMenu">
        <template #icon>
          <i-ep-arrow-left v-if="sideMenu" />
          <i-ep-arrow-right v-else />
        </template>
      </el-button>
    </div>
    <div style="flex: 1 1 0%"> </div>
    <div :class="`${prefixCls}-right`"> 右侧按钮区块 </div>
  </header>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores/modules/config'

const { prefixCls } = useDesign('layout-header')

const headerCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--fixed`]: true
  }
])

const configStore = useConfigStore()

const sideMenu = inject<boolean>('sideMenu')

const toggleSideMenu = () => {
  configStore.toggleSideMenu()
}
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-layout-header';
.@{prefix-cls} {
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
  height: var(--di-header-height);
  min-height: 35px;
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  transition: height 0.2s;

  &--fixed {
    position: fixed;
    top: 0;
  }

  &-logo {
    width: var(--di-menu-side-width);
    padding-left: 24px;

    &__title {
      font-size: 18px;
    }

    .side-menu-handle {
      position: absolute;
      left: calc(var(--di-menu-side-width) - 16px);
      top: calc(var(--di-header-height) / 2 - 16px);
      transition: transform 0.2s;
    }
  }

  &-right {
    padding-right: 12px;
  }
}
</style>
