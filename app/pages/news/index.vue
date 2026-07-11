<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(
  'news-list',
  () => queryCollection(`blog_${locale.value}`)
    .select('path', 'title', 'description', 'date', 'cover')
    .order('date', 'DESC')
    .all(),
  { watch: [locale] }
)

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(date))

useSeoMeta({
  title: () => t('nav.news'),
  description: () => t('news.description'),
  ogTitle: () => t('nav.news'),
  ogDescription: () => t('news.description')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('nav.news')"
      :description="t('news.description')"
    />
    <UContainer class="pb-16">
      <UBlogPosts v-if="posts?.length">
        <UBlogPost
          v-for="post in posts"
          :key="post.path"
          :title="post.title"
          :description="post.description"
          :date="formatDate(post.date)"
          :image="post.cover"
          :to="localePath(`/news${post.path}`)"
        />
      </UBlogPosts>
      <UEmpty
        v-else
        icon="i-lucide-newspaper"
        :title="t('news.empty.title')"
        :description="t('news.empty.description')"
      />
    </UContainer>
  </div>
</template>
