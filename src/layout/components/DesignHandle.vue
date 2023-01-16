<template>
  <el-divider></el-divider>
  <div class="btn-group">
    <el-button type="primary" style="width: 100%" @click="copyToClipboard">
      <template #icon>
        <i-ep-copy-document />
      </template>
      拷贝设置
    </el-button>
    <el-button type="warning" style="width: 100%" @click="handleRest">
      <template #icon>
        <i-ep-refresh-left />
      </template>
      重置设置
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/modules/config'
import { useClipboard, useDebounceFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { unref } from 'vue'

const store = useConfigStore()

const { copy } = useClipboard()

const copyToClipboard = useDebounceFn(() => {
  copy(JSON.stringify(unref(store.$state)))
  ElMessage.success('拷贝成功，请到 src/config/design.ts 中替换[defaultSettings]默认配置')
}, 800)

const handleRest = useDebounceFn(() => {
  store.reset()
  ElMessage.success('重置成功')
}, 800)
</script>

<style lang="less" scoped>
.btn-group {
  .el-button {
    width: 100%;
    display: block;
  }

  .el-button + .el-button {
    margin-left: 0;
    margin-top: 12px;
  }
}
</style>
