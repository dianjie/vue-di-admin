<template>
  <el-switch
    v-model="isDark"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="handleThemeChange"
  />
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { toggleDark } from '@/hooks/web/useDark'
import { inject } from 'vue'

const isDark = inject('isDark') as boolean
const handleThemeChange = () => {
  toggleDark()
}
</script>

<style lang="less" scoped></style>
