<template>
  <div :class="classCls">
    <div :class="`${prefixCls}-mask`" @click="toggleDrawer"></div>
    <div :class="`${prefixCls}-container`">
      <el-button type="primary" :class="`${prefixCls}-button`" @click="toggleDrawer">
        <i-ep-setting width="1.5rem" height="1.5rem" v-if="!drawer" />
        <i-ep-close width="1.5rem" height="1.5rem" v-else />
      </el-button>
      <div :class="`${prefixCls}-content`">
        <div :class="`${prefixCls}-header`">
          <h5 :class="`${prefixCls}-header__title`">主题定制</h5>
          <span :class="`${prefixCls}-header__desc`">
            Di Admin 为布局、顶部栏、菜单等提供了不同的主题。
          </span>
          <hr />
        </div>
        <el-scrollbar>
          <config-theme />
          <config-size />
          <config-menu />
          <component-themes />
          <topbar-themes />
          <menu-themes />
          <design-handle />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import ConfigSize from './ConfigSize.vue'
import ConfigMenu from './ConfigMenu.vue'
import ConfigTheme from './ConfigTheme.vue'
import ComponentThemes from './ComponentThemes.vue'
import TopbarThemes from './TopbarThemes.vue'
import MenuThemes from './MenuThemes.vue'
import DesignHandle from './DesignHandle.vue'

const drawer = ref(false)

const { prefixCls } = useDesign('layout-config')
const tempId = `scroll_locker_${+new Date()}_1`

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--open`]: unref(drawer)
  }
])

const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.style.cssText =
    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

const styleEl = ref()
const styleTimer = ref()

const lockScrollFunc = () => {
  const hasScrollBar = window.innerWidth - document.documentElement.clientWidth > 0
  // 滚动条
  const scrollBarSize = hasScrollBar ? getScrollbarWidth() : 0

  styleEl.value = document.createElement('style')
  styleEl.value.dataset.id = tempId
  const _cssData = `html,body {width: ${
    scrollBarSize !== 0 ? `calc(100% - ${scrollBarSize}px)` : undefined
  };overflow: hidden;}`
  styleEl.value.appendChild(document.createTextNode(_cssData))
  document.head.appendChild(styleEl.value)
}

const clearStyleFunc = () => {
  clearTimeout(styleTimer.value)
  styleTimer.value = setTimeout(() => {
    styleEl.value?.parentNode?.removeChild?.(styleEl.value)
  }, 150)
}

const toggleDrawer = () => {
  drawer.value = !unref(drawer)
  if (drawer.value) {
    lockScrollFunc()
  } else {
    clearStyleFunc()
  }
}
</script>

<style scoped lang="less">
@prefix-cls: ~'@{prefix-var}-layout-config';
.@{prefix-cls} {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 0;
  height: 100%;

  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: rgb(0 0 0 / 45%);
    opacity: 0;
    pointer-events: none;
  }

  &-container {
    position: absolute;
    padding: 0;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.28s cubic-bezier(0.38, 0, 0.24, 1);
  }

  &-button {
    position: absolute;
    top: 35%;
    left: -40px;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;

    :deep(> span) {
      margin-left: 2px;
    }
  }

  &-content {
    position: relative;
    height: 100vh;
    overflow: auto;
    background-color: var(--el-bg-color);
    box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%),
      0 9px 46px 8px rgb(0 0 0 / 12%);

    :deep(.el-scrollbar) {
      margin-top: 97px;
      height: calc(100% - 97px);
      padding-bottom: 1rem;
    }

    :deep(.el-scrollbar__wrap) {
      padding: 0 1rem;
    }

    :deep(.el-divider__text) {
      font-weight: 600;
    }
  }

  &-header {
    padding: 1rem 0.65rem 0;
    position: absolute;
    top: 0;

    &__title {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    &__desc {
      display: block;
      font-size: 12px;
      line-height: normal;
      color: var(--el-color-info);
    }

    hr {
      border-top: 1px var(--el-border-color) var(--el-border-style);
      border-width: 1px 0 0;
      margin-top: 1rem;
    }
  }

  &--open {
    width: 100%;

    .@{prefix-cls} {
      &-container {
        transform: translateX(0);
      }

      &-mask {
        opacity: 1;
        height: 100%;
        pointer-events: auto;
        transition: opacity 0.2s cubic-bezier(0.38, 0, 0.24, 1);
      }
    }
  }
}
</style>

<style lang="less">
@import url('../styles/theme-color.less');
</style>
