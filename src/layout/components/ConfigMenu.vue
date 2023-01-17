<template>
  <el-divider>菜单模式</el-divider>
  <el-radio-group v-model="store.menuMode" class="flex justify-center flex-nowrap">
    <el-radio-button label="default">默认</el-radio-button>
    <el-radio-button label="overlay">抽屉</el-radio-button>
    <el-radio-button label="horizontal">垂直</el-radio-button>
    <el-radio-button label="collapse">折叠</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/modules/config'
import { watch } from 'vue'
// https://github.com/vuejs/pinia/discussions/854
const store = useConfigStore()

watch(
  () => store.menuMode,
  (newValue) => {
    // 切换菜单模式为默认、抽屉，如果隐藏了就显示
    if (['default', 'overlay'].includes(newValue) && !store.sideMenu) {
      store.setSideMenuConfig(!store.sideMenu)
    }
  }
)
</script>

<style scoped></style>
