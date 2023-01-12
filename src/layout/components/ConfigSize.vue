<template>
  <el-divider>全局组件大小</el-divider>
  <el-radio-group v-model="size" style="justify-content: center; display: flex">
    <el-radio-button label="small" />
    <el-radio-button label="default" />
    <el-radio-button label="large" />
  </el-radio-group>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/modules/config'
import { storeToRefs } from 'pinia'

const store = useConfigStore()
const { size } = storeToRefs(store)
</script>

<style scoped></style>
