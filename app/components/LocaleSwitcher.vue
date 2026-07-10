<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed(() => [
  locales.value.map(l => ({
    label: l.name,
    checked: l.code === locale.value,
    type: 'checkbox' as const,
    onSelect: () => navigateTo(switchLocalePath(l.code))
  }))
])

const current = computed(() => locales.value.find(l => l.code === locale.value))
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      :label="current?.name"
      :aria-label="t('common.languageSwitcher')"
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
    />
  </UDropdownMenu>
</template>
