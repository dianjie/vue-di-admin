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
import { computed } from 'vue'

const { prefixCls } = useDesign('layout-wrapper')

const classCls = computed(() => [
  {
    [prefixCls]: true
  }
])
</script>
