<script setup lang="ts">
const { locale, t } = useI18n()

const { data: page } = await useAsyncData(
  'page-about',
  () => queryCollection(`pages_${locale.value}`).path('/about').first(),
  { watch: [locale] }
)

useSeoMeta({
  title: () => page.value?.title ?? t('nav.about'),
  description: () => page.value?.description ?? t('placeholder.translationPending'),
  ogTitle: () => page.value?.title ?? t('nav.about'),
  ogDescription: () => page.value?.description ?? t('placeholder.translationPending')
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
