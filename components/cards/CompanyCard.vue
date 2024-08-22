<template>
  <div class="company-card">
    <NuxtImg
      class="company-card__logo"
      :src="imageUrl"
      :alt="name"
      width="120"
      height="120"
    />
    <div class="company-card__name">
      {{ name }}
    </div>
    <ul class="company-card__info">
      <li v-if="docsVerified">
        <Icon name="annonce:star-checked" size="16px" />
        {{ isSmallScreen ? 'Проверен' : 'Документы проверены' }}
      </li>
      <li>
        <Icon name="annonce:star-filled" size="16px" />
        {{ rating?.rating ? rating?.rating: 5.0 }}
      </li>
      <li>
        {{ rating?.reviewCount ? rating?.reviewCount : 'Нет' }} отзывов
      </li>
    </ul>
    <div class="company-card__number">
      <annonce-button
        v-if="props.phoneNumber"
        :value="compnayButtonValue"
        :button-classes="['default']"
        @click="showCompanyPhone()"
      />
    </div>
    <div class="company-card__nav">
      <nuxt-link class="nav-item" to="/">
        Товары и услуги
      </nuxt-link>
      <nuxt-link class="nav-item" to="/agents">
        Агенты <span>{{ agentsCount }}</span>
      </nuxt-link>
      <nuxt-link class="nav-item" to="/about-company">
        О компании
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CompanyCard } from '~/types/CompanyCard'

const props = defineProps<Partial<CompanyCard>>()
const compnayButtonValue = ref<string>('Показать номер телефона')
const isSmallScreen = ref<boolean>(false)

const { data: rating } = await useAsyncData('rating', () => $fetch('/api/company/rating'))

const updateWindowWidth = () => {
  if (import.meta.client) {
    isSmallScreen.value = window.innerWidth <= 576
  }
}

const phoneFormat = (phoneNumber: number | string): string => {
  // Преобразуем телефон в строку, если он не строка
  let phone = typeof phoneNumber === 'string' ? phoneNumber : phoneNumber.toString()

  // Удаляем все, кроме цифр
  phone = phone.replace(/\D/g, '')

  // Форматирование номера
  return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5')
}

const showCompanyPhone = () => {
  const phoneNumber = props.phoneNumber ?? null
  if (phoneNumber) { compnayButtonValue.value = phoneFormat(phoneNumber) }
}

onMounted(() => {
  updateWindowWidth()
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<style scoped lang="scss">
.company-card{
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid $color-gray-300;
  width: 100%;

  &__logo{
    margin-bottom: 24px;
    border-radius: 20px;
  }

  &__name{
    margin-bottom: 11px;
    font-weight: $font-weight-semiBold;
    font-size: $font-size-lg;
  }

  &__info{
    margin-bottom: 25px;
    margin-right: 14px;
    display: flex;
    align-items: center;
    gap: 4px;

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

  &__number{
    margin-bottom: 31px;
  }

  &__nav{
    display: flex;
    align-items: center;
    gap: 8px;

    .nav-item{
      width: fit-content;
      padding: 7px 11px;
      border: 2px solid $color-gray-600;
      line-height: 160%;
      color: $color-black;
      background-color: $color-gray-600;
      border-radius: 12px;
      font-family: $font-family-primary;
      font-weight: $font-weight-medium;
      font-size: $font-size-sm;
      transition: all 0.2s ease-in;
      text-wrap: nowrap;

      span{
        color: $color-gray-400;
      }

      &:not(.router-link-active):hover{
        background-color: transparent;
        color: $color-black;
        opacity: 1;
      }

      &.router-link-active{
        border: 1px solid $color-black;

        &:hover{
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .company-card{
    padding: 0;
    &__logo, &__name, &__info, &__number{
      display: none;
    }
    &__nav{
      overflow: scroll;
      width: 100%;
      padding: 8px 32px 8px 16px;
      -ms-overflow-style: none; /* Scrollbar hide IE и Edge */
      scrollbar-width: none; /* Scrollbar hide Firefox */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
