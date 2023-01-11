<template>
  <div :class="prefixCls">
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

const { prefixCls } = useDesign('layout-wrapper')
</script>

<style scoped></style>
