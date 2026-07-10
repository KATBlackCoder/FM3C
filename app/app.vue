<script setup lang="ts">
import * as uiLocales from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const uiLocale = computed(() => uiLocales[locale.value as keyof typeof uiLocales])

useHead({
  htmlAttrs: {
    lang: computed(() => uiLocale.value?.code ?? locale.value),
    dir: computed(() => uiLocale.value?.dir ?? 'ltr')
  },
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
})

useSeoMeta({
  title: () => t('home.title'),
  description: () => t('home.description'),
  ogTitle: () => t('home.title'),
  ogDescription: () => t('home.description')
})
</script>

<template>
  <UApp :locale="uiLocale">
    <UHeader
      title="FM3C"
      :to="localePath('/')"
    >
      <template #title>
        <AppLogo />
      </template>

      <AppNav />

      <template #right>
        <LocaleSwitcher />
        <UColorModeButton />
      </template>

      <template #body>
        <AppNav />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          FM3C © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
