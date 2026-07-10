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
    name: 'FMCCC',
    defaultLocale: 'fr',
    // Câblé explicitement (recommandation nuxt-seo) plutôt que de compter sur la
    // détection automatique du module à l'exécution — lu ici au build, fiable sur Vercel.
    // Indexable par défaut ; NUXT_SITE_INDEXABLE=false coupe l'indexation (site placeholder).
    indexable: process.env.NUXT_SITE_INDEXABLE !== 'false'
  },

  routeRules: {
    '/': { prerender: true },
    // Anciennes URLs préfixées /fr (stratégie 'prefix' d'origine, déjà partagées)
    '/fr': { redirect: { to: '/', statusCode: 301 } },
    '/fr/**': { redirect: { to: '/**', statusCode: 301 } }
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

  // Cyrillique requis pour la locale RU (Inter/Oswald le fournissent)
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext', 'cyrillic']
    }
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
