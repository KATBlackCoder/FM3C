<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UPageHero
    :title="t('home.title')"
    :description="t('home.description')"
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
