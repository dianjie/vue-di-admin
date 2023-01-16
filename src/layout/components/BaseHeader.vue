<template>
  <header :class="headerCls">
    <div :class="`${prefixCls}-logo`">
      <h1 :class="`${prefixCls}-logo__title`">Di Admin</h1>
      <el-button
        v-if="!menuModeIsHorizontal"
        :class="handleCls"
        type="warning"
        circle
        @click="toggleSideMenu"
      >
        <template #icon>
          <i-ep-arrow-left />
        </template>
      </el-button>
    </div>
    <div style="flex: 1 1 0%"> </div>
    <div :class="`${prefixCls}-right`">
      <el-tooltip content="代码仓库" placement="bottom">
        <el-icon :class="iconBtnCls" @click="navToGitHub">
          <i-mdi-github />
        </el-icon>
      </el-tooltip>
      <el-tooltip content="组件主题色" placement="bottom" :class="`${prefixCls}-right__item`">
        <div :class="`${prefixCls}-right__item`">
          <el-color-picker v-model="configStore.componentTheme" @change="changeComponentTheme" />
        </div>
      </el-tooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, inject, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores/modules/config'
import type { SizeType } from '#/config'
import { storeToRefs } from 'pinia'
import pgk from '../../../package.json'
import { changeComponentTheme } from '@/hooks/web/useComponentTheme'

const { prefixCls } = useDesign('layout-header')

const headerCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--fixed`]: true
  }
])

const configStore = useConfigStore()
const { menuModeIsHorizontal } = storeToRefs(configStore)

const sideMenu = inject<boolean>('sideMenu')

const toggleSideMenu = () => {
  configStore.toggleSideMenu()
}

const size = inject<SizeType>('size')
const handleCls = computed(() => [
  {
    'side-menu-handle': true,
    'side-menu-handle--default': unref(size) === 'default',
    'side-menu-open': unref(sideMenu)
  }
])

const iconBtnCls = computed(() => [
  {
    'icon-btn': true,
    [`icon-btn--${unref(size)}`]: true,
    [`${prefixCls}-right__item`]: true
  }
])

const navToGitHub = () => {
  window.open(pgk.homepage)
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
  transition: height linear 0.2s;

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
      left: calc(var(--di-menu-side-width) - calc(var(--el-button-size) / 2));
      top: calc(var(--di-header-height) / 2 - calc(var(--el-button-size) / 2));
      transition: width linear 0.2s, height linear 0.2s;

      :deep(.el-icon) {
        transition: transform 0.2s;
      }

      &--default {
        left: calc(var(--di-menu-side-width) - 16px);
        top: calc(var(--di-header-height) / 2 - 16px);
      }
    }

    .side-menu-open {
      :deep(.el-icon) {
        transform: rotate(-180deg);
      }
    }
  }

  &-right {
    display: flex;
    padding-right: 12px;

    &__item {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }

    .icon-btn {
      font-size: 24px;
      cursor: pointer;

      &--small {
        font-size: 24px;
      }

      &--default {
        font-size: 32px;
      }

      &--large {
        font-size: 40px;
      }
    }
  }
}
</style>