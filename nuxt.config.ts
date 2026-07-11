// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @nuxtjs/seo doit précéder @nuxt/content (intégration asSeoCollection)
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/seo', '@nuxtjs/i18n', '@nuxt/content'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // URL explicite : depuis le pré-rendu complet, canonicals/og:url/sitemap sont
  // figés au build — sans elle, Vercel fournit VERCEL_URL (URL de déploiement
  // hashée) et non le domaine public. NUXT_SITE_URL prendra le relais quand le
  // domaine .ml sera branché.
  site: {
    url: process.env.NUXT_SITE_URL || 'https://fmccc.vercel.app',
    name: 'FMCCC',
    defaultLocale: 'fr',
    // Câblé explicitement (recommandation nuxt-seo) plutôt que de compter sur la
    // détection automatique du module à l'exécution — lu ici au build, fiable sur Vercel.
    // Indexable par défaut ; NUXT_SITE_INDEXABLE=false coupe l'indexation (site placeholder).
    indexable: process.env.NUXT_SITE_INDEXABLE !== 'false'
  },

  // Connecteur node:sqlite (natif) : better-sqlite3 ne charge pas ses bindings
  // dans les fonctions Vercel Node 22/24 (nuxt/content#3689) — 500 sur toute
  // requête de contenu en prod. Node ≥ 22.5 requis (Vercel et local OK).
  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  routeRules: {
    // Anciennes URLs préfixées /fr (stratégie 'prefix' d'origine, déjà partagées)
    '/fr': { redirect: { to: '/', statusCode: 301 } },
    '/fr/**': { redirect: { to: '/**', statusCode: 301 } }
  },

  compatibilityDate: '2026-06-30',

  // Tout le site est pré-rendu au build (architecture.md §1 : rendu statique
  // pour les pages vitrine/contenu) : HTML + payloads servis par le CDN Vercel
  // au lieu d'une fonction serverless par requête (TTFB 0,9-2,4 s constaté).
  // Le crawler part des trois racines de locale — le sélecteur de langue est
  // un menu (pas des liens), donc /en et /ru doivent être listés explicitement.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/ru']
    }
  },

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
