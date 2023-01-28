<template>
  <el-divider>界面功能</el-divider>
  <div class="flex justify-between my-4">
    <span> 固定侧边菜单</span>
    <el-switch
      v-model="store.sidebarFixed"
      :disabled="sidebarFixedDisabled"
      @change="(val) => sidebarFixedChange(store, val)"
    />
  </div>
</template>

<script setup lang="ts">
import { sidebarFixedChange } from '@/hooks/web/useSidebarFixed'
import { useConfigStore } from '@/stores/modules/config'
import { computed } from 'vue'

const store = useConfigStore()

const sidebarFixedDisabled = computed(() => {
  return store.menuModeIsHorizontal || store.menuModeIsOverlay
})
</script>

<style lang="less" scoped>
.justify-between {
  justify-content: space-between;
}

.my-4 {
  margin: 16px 0;
}
</style>
