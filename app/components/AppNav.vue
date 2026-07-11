<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// 'vertical' pour le panneau mobile (slot #body du UHeader)
const { orientation = 'horizontal' } = defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.news'), to: localePath('/news') },
  { label: t('nav.clubs'), to: localePath('/clubs') },
  { label: t('nav.competitions'), to: localePath('/competitions') },
  { label: t('nav.contact'), to: localePath('/contact') }
])
</script>

<template>
  <UNavigationMenu
    :items="items"
    :orientation="orientation"
  />
</template>
