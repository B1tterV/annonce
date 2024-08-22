<template>
  <div
    ref="agentCardRef"
    class="agent-card"
  >
    <NuxtImg
      class="agent-card__image"
      :src="imageUrl"
      :alt="`${firstName} ${lastName}`"
      width="140"
      height="140"
      placeholder
    />
    <div class="agent-card__content">
      <div class="main-info">
        <div class="agent-fullname">
          {{ firstName }} {{ lastName }}
        </div>
        <ul class="agent-info">
          <li v-if="docsVerified">
            <Icon name="annonce:star-checked" size="16px" />
            {{ isSmallScreen ? 'Проверен' : 'Документы проверены' }}
          </li>
          <li v-if="reviewCount > 0 && rating">
            <Icon name="annonce:star-filled" size="16px" />
            {{ rating ? rating: 5.0 }}
          </li>
          <li>
            {{ reviewCount ? reviewCount : 'Нет' }} отзывов
          </li>
        </ul>
      </div>
      <div
        ref="descriptionRef"
        class="agent-description"
        :style="{ maxHeight: remainingHeight + 'px' }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AgentCard } from '~/types/AgentCard'

defineProps<AgentCard>()

const agentCardRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const remainingHeight = ref<number>(0)
const contentHeight = 140
const isSmallScreen = ref<boolean>(false)

const updateWindowWidth = () => {
  if (import.meta.client) {
    isSmallScreen.value = window.innerWidth <= 576
  }
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)

  if (agentCardRef.value) {
    const usedHeight = agentCardRef.value.querySelector('.agent-card__content .main-info')?.clientHeight || 0
    remainingHeight.value = contentHeight - usedHeight

    // Проверка, если текст не помещается
    if (descriptionRef.value && descriptionRef.value.scrollHeight > remainingHeight.value) {
      descriptionRef.value.style.webkitLineClamp = `
        ${Math.floor(remainingHeight.value / parseFloat(getComputedStyle(descriptionRef.value).lineHeight))}`
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<style scoped lang="scss">
.agent-card{
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 560px;
  width: 100%;
  background-color: $color-gray-500;
  border-radius: 20px;
  &__image{
    border-radius: 20px;
    object-fit: cover;
  }
  &__content{
    padding-top: 4px;
    .agent-fullname{
      margin-bottom: 2px;
      font-weight: $font-weight-semiBold;
      font-size: $font-size-lg;
    }
    .agent-info{
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      gap: 3px;

      li{
        display: flex;
        align-items: center;
        gap: 4px;

        &:not(:first-child)::before {
          display: inline-block;
          color: #000;
          content: "•";
        }
      }
    }
    .agent-description{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-height: 24px;
    }
  }

  @media (max-width: 576px) {
    padding: 16px;
    display: grid;
    grid-template-columns: 48px 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "image main-info"
      "agent-description agent-description";
    row-gap: 8px;
    column-gap: 12px;
    &__image{
      width: 48px;
      height: 48px;
      border-radius: 10px;
      grid-area: image;
    }
    &__content{
      display: contents;
      .main-info {
        grid-area: main-info;
        .agent-fullname{
          font-size: $font-size-lg-min;
        }
        .agent-info{
          margin-bottom: 0;
        }
      }

      .agent-description {
        grid-area: agent-description;
      }
    }
  }
}
</style>
