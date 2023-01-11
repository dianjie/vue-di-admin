<template>
  <div :class="classCls">
    <div :class="`${prefixCls}-mask`" @click="toggleDrawer"></div>
    <div :class="`${prefixCls}-container`">
      <el-button type="primary" :class="`${prefixCls}-button`" @click="toggleDrawer">
        <i-ep-setting width="1.5rem" height="1.5rem" v-if="!drawer" />
        <i-ep-close width="1.5rem" height="1.5rem" v-else />
      </el-button>
      <div :class="`${prefixCls}-content`"> </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'

const drawer = ref(false)

const { prefixCls } = useDesign('layout-config')

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--open`]: unref(drawer)
  }
])

const toggleDrawer = () => {
  drawer.value = !unref(drawer)
}
</script>

<style scoped lang="less">
@prefix-cls: ~'@{prefix-var}-layout-config';
.@{prefix-cls} {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  width: 0;
  height: 100%;
  transition: width 0s ease 0.3s, height 0s ease 0.3s;

  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: rgb(0 0 0 / 45%);
    opacity: 0;
    pointer-events: none;
  }

  &-container {
    position: absolute;
    padding: 0;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &-button {
    position: absolute;
    top: 35%;
    left: -40px;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;

    :deep(> span) {
      margin-left: 2px;
    }
  }

  &-content {
    position: relative;
    height: 100vh;
    padding: 1em;
    overflow: auto;
    background-color: #fff;
  }

  &--open {
    width: 100%;

    .@{prefix-cls} {
      &-container {
        transform: translateX(0);
      }

      &-mask {
        opacity: 1;
        height: 100%;
        pointer-events: auto;
        transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), height 0s ease 0.3s;
      }
    }
  }
}
</style>
