<template>
  <div class="product-card">
    <div class="product-card__image">
      <div v-if="promotion !== 'hidden'" class="info-items">
        <div class="views-count info-item">
          <Icon name="annonce:eye" />
          {{ viewsCount }}
        </div>
        <div class="ad-days info-item">
          <Icon name="annonce:calendar" />
          {{ adDays }} дня
        </div>
      </div>
      <NuxtImg
        :src="imageUrl"
        :alt="name"
        width="414"
        height="322"
        placeholder
      />
    </div>
    <div class="product-card__price">
      {{ localPrice }}

      <span v-if="pieceByPiece">шт</span>
    </div>
    <div class="product-card__name">
      {{ name }}
    </div>
    <div class="product-card__promotion">
      <div v-if="promotion === 'advances'" class="promotion promotion_advances promotion_unclicable">
        Объявление продвигается
      </div>
      <div v-else-if="promotion === 'hidden'" class="promotion promotion_hidden promotion_unclicable">
        Объявление скрыто
      </div>
      <div v-else class="promotion promotion_default">
        Увеличьте количество просмотров
        <annonce-button
          value="Продвигать"
          :button-classes="['default', 'small']"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCard } from '~/types/ProductCard'

const props = defineProps<ProductCard>()
const localPrice = ref<string>(new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  currencyDisplay: 'symbol',
  roundingPriority: 'morePrecision'
}).format(props.price))
</script>

<style scoped lang="scss">
.product-card{
  font-weight: $font-weight-medium;
  width: 100%;

  &__image{
    margin-bottom: 16px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info-items{
      position: absolute;
      top: 8px;
      left: 8px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;

      .info-item{
        display: flex;
        padding: 4px 8px;
        color: $color-white;
        background: rgb(27 29 34 / 60%);
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        font-size: $font-size-xs;
      }
    }
  }

  &__price{
    margin-bottom: 14px;
    padding-left: 4px;
    font-size: $font-size-md;

    span{
      font-size: $font-size-xxs;
      line-height: 145%;
    }
  }

  &__name{
    text-overflow: ellipsis;
    margin-bottom: 11px;
    padding-left: 4px;
    text-wrap: nowrap;
    overflow: hidden;
  }

  &__promotion{
    border-top: 1px solid $color-gray-600;
    padding: 11px 4px 4px;
    overflow: hidden;

    .promotion{
      display: flex;
      align-items: center;
      height: 40px;

      &_unclicable{
        justify-content: center;
      }

      &_advances{
        color: $color-green;
      }

      &_hidden{
        color: $color-red;
      }

      &_default{
        justify-content: space-between;
        gap: 12px;
        font-size: $font-size-xs;
        letter-spacing: -0.005em;
        color: $color-gray-400;
      }
    }
  }
}
</style>
