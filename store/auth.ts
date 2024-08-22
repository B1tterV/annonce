import { defineStore } from 'pinia'

import type { User } from '~/types/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
    user: null as User | null
  }),
  actions: {
    async login (email: string, password: string) {
      const { signIn, getSession } = useAuth()
      await signIn({ email, password })
      const session = await getSession()
      if (session) {
        this.user = session as User || null
      }
    },

    async register (email: string, password: string) {
      const { signUp } = useAuth()
      await signUp({ email, password }, undefined, { preventLoginFlow: true })
    },

    async refreshAccessToken () {
      const { refresh } = useAuth()
      try {
        await refresh()
      } catch (error) {
        this.logout()
        throw new Error('Failed to refresh access token')
      }
    },

    logout () {
      const { signOut } = useAuth()
      signOut()
      this.accessToken = null
      this.refreshToken = null
      this.user = null
    }
  },
  persist: true
})
