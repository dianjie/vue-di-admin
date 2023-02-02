import { defineStore } from 'pinia'
import router from '@/router'
import { LOGIN_PATH } from '@/router/constant'
import { unref } from 'vue'
import { setObjToUrlParams } from '@/utils'

interface rememberForm {
  username?: string
  password?: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    tokenTime: '' as string | number,
    refreshToken: '',
    userInfo: null as any,
    // 记住密码
    remember: false,
    rememberForm: {} as rememberForm
  }),
  getters: {
    getToken: (state) => {
      return state.token
    },
    getTokenTime: (state) => {
      return state.tokenTime
    },
    getAvatar: (state) => {
      return state.userInfo?.avatar || ''
    },
    getAccount: (state) => {
      return state.userInfo?.account || ''
    },
    getNickName: (state) => {
      return state.userInfo?.nick_name || ''
    }
  },
  actions: {
    setRemember(val: boolean) {
      this.remember = val
    },
    setRememberForm(remember: boolean, form: rememberForm) {
      if (remember) {
        this.rememberForm = form
      } else {
        this.rememberForm = {}
      }
    },
    setToken(info: string | undefined | null) {
      this.token = info || ''
      const time = new Date().getTime()
      this.tokenTime = time
    },
    setRefreshToken(info: string) {
      this.refreshToken = info
    },
    setUserInfo(info: any | null) {
      this.userInfo = info
    },
    async login(userInfo: Record<string, any>, remember: boolean) {
      const data = {
        access_token: 'access_token',
        refresh_token: 'refresh_token'
      }
      const { access_token, refresh_token } = data
      // save token
      this.setToken(access_token)
      this.setRefreshToken(refresh_token)
      this.setUserInfo(data)
      this.setRemember(remember)
      this.setRememberForm(remember, {
        username: userInfo.username,
        password: userInfo.password
      })
      return Promise.resolve()
    },
    // 刷新token
    async handleRefreshToken() {
      const data = {
        access_token: 'access_token',
        refresh_token: 'refresh_token'
      }
      const { access_token, refresh_token } = data
      this.setToken(access_token)
      this.setRefreshToken(refresh_token)
      this.setUserInfo(data)
    },
    logout(goLogin = false) {
      const stateHandle = () => {
        this.$reset()
        localStorage.removeItem('user')
      }
      if (goLogin) {
        const { path, query } = unref(router.currentRoute)
        const { redirect, ...other } = query
        const urlParams = setObjToUrlParams('/', other)
        const redirectPath = urlParams === '?' ? path : `${path}${urlParams}`
        router.replace(`${LOGIN_PATH}?redirect=${redirectPath}`)
        stateHandle()
      } else {
        stateHandle()
      }
    }
  },
  persist: true
})
