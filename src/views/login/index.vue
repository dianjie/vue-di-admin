<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-top`">
      <div :class="`${prefixCls}-top__left`">
        <h1 :class="`${prefixCls}-top__title`">Di Admin</h1>
      </div>
      <div :class="`${prefixCls}-top__right`">
        <toggle-dark class="theme-toggler" />
      </div>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="[`${prefixCls}-content__main`]">
        <h1>密码登录</h1>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          :disabled="submiting"
          label-width="0"
          size="large"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号" clearable />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="密码"
              clearable
            />
          </el-form-item>

          <div style="margin-bottom: 8px" class="flex justify-between">
            <el-checkbox v-model="remember" size="default">记住密码</el-checkbox>
            <el-button link>忘记密码?</el-button>
          </div>
          <el-form-item>
            <el-button type="primary" class="w-full" @click="submitForm(loginFormRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { useDebounceFn } from '@vueuse/core'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ToggleDark from '@/components/ToggleDark.vue'

const userStore = useUserStore()
const router = useRouter()
const { prefixCls } = useDesign('login-box')
const { remember: rememberPwd, rememberForm } = storeToRefs(userStore)
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'demo1',
  password: '123456'
})
const remember = ref(false)
if (unref(rememberPwd)) {
  const { username = '', password = '' } = unref(rememberForm)
  remember.value = true
  loginForm.username = username
  loginForm.password = password
}
const submiting = ref(false)
const rules = reactive<FormRules>({
  username: [{ required: true, message: '账号必填', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = useDebounceFn((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        submiting.value = true
        await userStore.login(loginForm, remember.value)
        router.replace('/')
      } catch (e: any) {
        e.error_description && ElMessage({ type: 'error', message: e.error_description })
        submiting.value = false
      }
    }
  })
}, 300)
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{prefix-var}-login-box';

.@{prefix-cls} {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--di-header-height);
    min-height: 35px;
    background-color: var(--di-header-bg-color);
    color: var(--di-header-text-color);
    transition: height linear 0.2s;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    &__left {
      width: var(--di-menu-side-width);
      padding-left: 24px;
    }

    &__title {
      font-size: 18px;
    }

    &__right {
      padding-right: 24px;

      .theme-toggler {
        margin-left: 5px;
      }
    }
  }

  &-content {
    flex: 1;

    &__main {
      width: 400px;
      z-index: 10;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 25px;
      background-color: var(--el-bg-color);
      max-width: 90%;
      border: 1.5px solid #e4e4e4;
      border-radius: 6px;
      box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
        0 1px 3px 0 rgb(0 0 0 / 12%);

      :deep(.el-form .el-form-item:last-child) {
        margin-bottom: 8px;
      }

      h1 {
        line-height: 36px;
        font-size: 18px;
        text-align: center;
        margin-bottom: 18px;
        margin-top: 0;
      }
    }

    .w-full {
      width: 100%;
    }
  }
}
@media screen and (max-width: 768px) {
  .@{prefix-cls} {
    &_top {
      padding: 0 15px;
    }
  }
}
</style>
