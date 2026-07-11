<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const heroLinks = computed(() => [
  { label: t('home.ctaAbout'), to: localePath('/about'), icon: 'i-lucide-shield', color: 'primary' as const },
  { label: t('home.ctaContact'), to: localePath('/contact'), color: 'neutral' as const, variant: 'outline' as const }
])
</script>

<template>
  <UPageHero
    :title="t('home.title')"
    :description="t('home.description')"
    :links="heroLinks"
  >
    <template #headline>
      <img
        src="/logo.png"
        :alt="t('home.title')"
        width="124"
        height="128"
        class="mx-auto h-32 w-auto"
      >
    </template>
  </UPageHero>
</template>
