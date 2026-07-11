<script setup lang="ts">
const { locale, t } = useI18n()

const { data: page } = await useAsyncData(
  'page-about',
  () => queryCollection(`pages_${locale.value}`).path('/about').first(),
  { watch: [locale] }
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
