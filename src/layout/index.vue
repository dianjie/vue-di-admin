<template>
  <div :class="classCls">
    <base-header />
    <base-menu />
    <base-content />
    <base-config />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from './components/BaseHeader.vue'
import BaseMenu from './components/BaseMenu.vue'
import BaseContent from './components/BaseContent.vue'
import BaseConfig from './components/BaseConfig.vue'

import { useDesign } from '@/hooks/web/useDesign'
import { computed, inject, unref } from 'vue'

const { prefixCls } = useDesign('layout-wrapper')

const size = inject<string>('size')

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--${unref(size)}`]: true
  }
])
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-layout-wrapper';
.@{prefix-cls} {
  &--small {
    --di-header-height: 46px;
    --di-menu-horizontal-height: 32px;
  }

  &--large {
    --di-header-height: 66px;
    --di-menu-horizontal-height: 52px;
  }
}
</style>
