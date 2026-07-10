// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @nuxtjs/seo doit précéder @nuxt/content (intégration asSeoCollection)
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/seo', '@nuxtjs/i18n', '@nuxt/content'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // URL de prod via NUXT_SITE_URL (Vercel) — domaine .ml pas encore confirmé
  site: {
    name: 'FM3C',
    defaultLocale: 'fr'
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
