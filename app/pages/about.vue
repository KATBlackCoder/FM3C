<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <UPageHero
    :title="t('nav.about')"
    :description="t('placeholder.comingSoon')"
  />
</template>
