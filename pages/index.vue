<template>
  <div class="products-services">
    <company-card v-bind="company" />
    <div class="products-services__products">
      <annonce-select
        v-model="selectedActiveFilter"
        :options="filterOptions"
      />
      <div class="product-cards">
        <product-card
          v-for="product in products"
          :key="`product-${product.id}`"
          v-bind="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: products } = await useAsyncData('products', () => $fetch('/api/company/products'))
const { data: company } = await useAsyncData('company', () => $fetch('/api/company/details'))

const selectedActiveFilter = ref<string | number | null>(null)
const filterOptions = reactive([
  { value: null, label: 'Все товары и услуги', count: 0, showCount: false },
  { value: 'category1-graves', label: 'Гробы', count: 5, showCount: true, groupLabel: 'Категория 1' },
  { value: 'category1-urns', label: 'Урны', count: 12, showCount: true, groupLabel: 'Категория 1' },
  { value: 'category2-slippers', label: 'Тапки', count: 2, showCount: true, groupLabel: 'Категория 2' },
  { value: 'category2-blanket', label: 'Покрывало', count: 1, showCount: true, groupLabel: 'Категория 2' }
])
</script>

<style scoped lang="scss">
.products-services{
  padding-bottom: 73px;

  &__products{
    padding: 23px 40px 0;

    .annonce-select{
      display: flex;
      align-items: center;
      margin-bottom: 32px;
    }
    .product-cards{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(414px, 1fr));
      gap: 57px 24px;
    }
  }

  @media (max-width: 576px) {
    padding-bottom: 0;
    &__products{
      padding: 23px 16px 0 16px;
      .product-cards{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
        gap: 8px;
      }
    }
  }
}

</style>
