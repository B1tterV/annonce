<template>
  <div class="annonce-footer">
    <div class="annonce-footer__copyright">
      © Annonce 2023
    </div>
    <div class="annonce-footer__links">
      <nuxt-link to="/documents">
        Документы
      </nuxt-link>
      <nuxt-link to="/about-company">
        О компании
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.annonce-footer{
  display: flex;
  padding: 24px 32px;
  align-items: center;
  border-top: 1px solid $color-gray-100;
  gap: 20px;
  background-color: $color-gray-500;

  &__copyright{
    font-weight: $font-weight-medium;
  }

  &__links{
    display: flex;
    align-items: center;
    gap: 20px;

    a{
      color: $color-gray-400;
    }
  }
}
</style>
