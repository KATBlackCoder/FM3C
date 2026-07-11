<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('nav.contact'),
  description: () => t('contact.description'),
  ogTitle: () => t('nav.contact'),
  ogDescription: () => t('contact.description')
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('nav.contact')"
      :description="t('contact.description')"
    />
    <UContainer class="pb-16">
      <UPageGrid>
        <UPageCard
          icon="i-lucide-map-pin"
          :title="t('contact.hq.label')"
          :description="t('contact.hq.value')"
        />
        <UPageCard
          icon="i-lucide-phone"
          :title="t('contact.phone.label')"
          :description="t('contact.pendingValue')"
        />
        <UPageCard
          icon="i-lucide-mail"
          :title="t('contact.email.label')"
          :description="t('contact.pendingValue')"
        />
      </UPageGrid>
      <p class="mt-8 text-sm text-muted">
        {{ t('contact.pendingNote') }}
      </p>
    </UContainer>
  </div>
</template>
