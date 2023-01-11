<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '@/stores/modules/config'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

const store = useConfigStore()
const { language, size, sideMenu } = storeToRefs(store)

const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

provide('sideMenu', sideMenu)
</script>

<style scoped></style>
