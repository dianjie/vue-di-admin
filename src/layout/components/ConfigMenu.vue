<template>
  <el-divider>菜单模式</el-divider>
  <el-radio-group v-model="store.menuMode" class="flex justify-center">
    <el-radio-button label="default">默认</el-radio-button>
    <el-radio-button label="overlay">抽屉</el-radio-button>
    <el-radio-button label="horizontal">垂直</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/modules/config'
// https://github.com/vuejs/pinia/discussions/854
const store = useConfigStore()
</script>

<style scoped></style>
