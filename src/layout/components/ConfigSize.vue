<template>
  <el-divider>全局组件大小</el-divider>
  <el-radio-group v-model="store.size" class="flex justify-center">
    <el-radio-button label="small">小</el-radio-button>
    <el-radio-button label="default">默认</el-radio-button>
    <el-radio-button label="large">大</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/modules/config'
// https://github.com/vuejs/pinia/discussions/854
const store = useConfigStore()
</script>

<style scoped></style>
