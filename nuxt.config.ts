import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [{
        name: 'Content-Security-Policy',
        content: 'This is my page description.'
      }]
    }
  },

  typescript: {
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        esModuleInterop: true
      }
    }
  },

  pages: true,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@sidebase/nuxt-auth'
  ],
  css: ['@/assets/css/style.scss'],
  plugins: [],

  auth: {
    isEnabled: true,
    originEnvKey: 'SERVER_URL',
    baseURL: 'http://localhost:3000' + '/api/auth',
    provider: {
      type: 'refresh',
      token: {
        signInResponseTokenPointer: '/accessToken',
        type: 'Bearer',
        cookieName: 'accessToken',
        headerName: 'Authorization',
        maxAgeInSeconds: 3600, // 1 hour
        sameSiteAttribute: 'lax',
        cookieDomain: 'localhost',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/refreshToken',
        refreshRequestTokenPointer: '/refreshToken',
        cookieName: 'refreshToken',
        maxAgeInSeconds: 604800, // 7 days
        cookieDomain: 'localhost',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false
      },
      endpoints: {
        signIn: { path: '/login', method: 'post', headers: { 'Content-Type': 'application/json' } },
        signOut: { path: '/logout', method: 'post', headers: { 'Content-Type': 'application/json' } },
        signUp: { path: '/register', method: 'post', headers: { 'Content-Type': 'application/json' } },
        getSession: { path: '/session', method: 'get', headers: { 'Content-Type': 'application/json' } },
        refresh: { path: '/refresh-token', method: 'post', headers: { 'Content-Type': 'application/json' } }
      },
      pages: {
        login: '/'
      }
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true
    },
    globalAppMiddleware: false // Включает глобальное middleware для защиты всех страниц
  },

  alias: {
    '@css': fileURLToPath(new URL('./assets/css', import.meta.url)),
    '@img': fileURLToPath(new URL('./assets/img', import.meta.url)),
    '@types': fileURLToPath(new URL('./types/', import.meta.url))
  },

  icon: {
    size: '24px',
    customCollections: [
      {
        prefix: 'annonce',
        dir: './assets/icons'
      }
    ]
  },

  image: {
    placeholder: './public/img/ui/placeholder.jpg',
    fallback: './public/img/ui/no-image.png',
    lazy: true
  },

  vite: {
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: `
            @import "@/assets/css/base/_colors.scss";
            @import "@/assets/css/base/_typography.scss";
            @import "@/assets/css/abstracts/_variables.scss";
          `
        }
      }
    }
  },

  components: [
    { global: true, path: '~/components', pathPrefix: false }
  ],

  runtimeConfig: {
    public: {
      SECRET_KEY: process.env.SECRET_KEY,
      SERVER_URL: process.env.AUTH_ORIGIN
    }
  },

  compatibilityDate: '2024-08-21'
})
