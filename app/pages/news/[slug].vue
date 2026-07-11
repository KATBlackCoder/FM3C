<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))

// Clé par locale + slug : requise pour le prerender (cf. app/pages/about.vue)
const { data: post } = await useAsyncData(
  () => `news-${locale.value}-${slug.value}`,
  () => queryCollection(`blog_${locale.value}`).path(`/${slug.value}`).first()
)

const formattedDate = computed(() => post.value
  ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(post.value.date))
  : '')

useSeoMeta({
  title: () => post.value?.title ?? t('nav.news'),
  description: () => post.value?.description ?? '',
  ogTitle: () => post.value?.title ?? t('nav.news'),
  ogDescription: () => post.value?.description ?? ''
})
</script>

<template>
  <UContainer v-if="post">
    <UPage>
      <UPageHeader
        :headline="formattedDate"
        :title="post.title"
        :description="post.description"
      />
      <UPageBody>
        <ContentRenderer :value="post" />
        <UButton
          :to="localePath('/news')"
          icon="i-lucide-arrow-left"
          variant="link"
          color="neutral"
          class="mt-8 px-0"
        >
          {{ t('news.back') }}
        </UButton>
      </UPageBody>
    </UPage>
  </UContainer>
  <UContainer
    v-else
    class="py-24"
  >
    <UEmpty
      icon="i-lucide-newspaper"
      :title="t('news.unavailable.title')"
      :description="t('news.unavailable.description')"
      :actions="[{ label: t('news.back'), to: localePath('/news'), icon: 'i-lucide-arrow-left' }]"
    />
  </UContainer>
</template>
