<script setup lang="ts">
const { locale, t } = useI18n()

// La clé DOIT inclure la locale : une clé statique est partagée entre les
// routes /about, /en/about et /ru/about par le cache de payload du prerender
// (contenu FR servi aux trois locales, ou null selon la concurrence).
// Clé réactive → re-fetch automatique au changement de langue côté client.
const { data: page } = await useAsyncData(
  () => `page-about-${locale.value}`,
  () => queryCollection(`pages_${locale.value}`).path('/about').first()
)

// translationPending ne vaut que pour une locale sans document — pas pour un
// document dont la description est simplement absente
const metaDescription = computed(() =>
  page.value ? page.value.description ?? '' : t('placeholder.translationPending')
)

useSeoMeta({
  title: () => page.value?.title ?? t('nav.about'),
  description: metaDescription,
  ogTitle: () => page.value?.title ?? t('nav.about'),
  ogDescription: metaDescription
})
</script>

<template>
  <UContainer v-if="page">
    <UPage>
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />
      <UPageBody>
        <ContentRenderer :value="page" />
      </UPageBody>
    </UPage>
  </UContainer>
  <UPageHero
    v-else
    :title="t('nav.about')"
    :description="t('placeholder.translationPending')"
  />
</template>
