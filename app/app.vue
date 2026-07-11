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
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
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
      title="FMCCC"
      :to="localePath('/')"
      class="after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:bg-[linear-gradient(90deg,#18B339_0_33.4%,#F9D118_33.4%_66.7%,#BD292A_66.7%_100%)]"
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
        <AppNav orientation="vertical" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          {{ t('footer.tagline') }}
        </p>
      </template>

      <p class="text-sm text-muted">
        FMCCC © {{ new Date().getFullYear() }}
      </p>

      <template #right>
        <ULink
          :to="localePath('/contact')"
          class="text-sm text-muted hover:text-highlighted"
        >
          {{ t('footer.contact') }}
        </ULink>
      </template>
    </UFooter>
  </UApp>
</template>
