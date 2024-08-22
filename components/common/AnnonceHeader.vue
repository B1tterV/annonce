<template>
  <div class="annonce-header">
    <div class="annonce-header__left-content">
      <Icon class="burger-menu" name="annonce:menu" />
      <nuxt-link class="header-logo" to="/">
        <p v-if="header?.name">
          {{ header?.name }}
        </p>
        <NuxtImg
          v-else
          class="company-card__logo"
          :src="header?.logo"
          alt="logo"
          width="40"
          height="40"
        />
      </nuxt-link>
      <div class="cart">
        <Icon class="cart__icon" name="annonce:cart" />
      </div>
      <div class="catergories-selector">
        <Icon name="annonce:categories" />
        Все категории
      </div>
    </div>
    <div class="annonce-header__right-content row">
      <div class="nav">
        <div class="nav-item">
          <Icon name="annonce:point" size="16px" />
          Ростов-на-Дону
        </div>
        <nuxt-link to="/" class="nav-item nav-item_link">
          Разместить объявление
        </nuxt-link>
      </div>
      <div
        v-if="user"
        class="account"
      >
        <Icon
          class="burger-menu"
          name="annonce:menu"
        />
        <NuxtImg
          class="agent-card__image"
          :src="user?.image"
          :alt="`account`"
          width="40"
          height="40"
        />
      </div>
      <annonce-button
        v-else
        value="Войти"
        :button-classes="['default', 'small']"
        @click="$emit('login', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const { data: header } = await useAsyncData('header', () => $fetch('/api/company/header'))

defineEmits(['login'])

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style scoped lang="scss">
.annonce-header{
  display: flex;
  justify-content: space-between;
  height: 63px;
  padding: 0 32px 0 40px;
  background: $color-peach;
  align-items: center;

  &__left-content{
    display: flex;
    align-items: center;
    gap: 37px;
    .burger-menu{
      display: none;
    }
    .cart{
      display: none;
    }
  }

  &__right-content{
    display: flex;
    align-items: center;
    gap: 36px;
  }

  .header-logo{
    font-family: $font-family-secondary;
    font-size: 28px;
    line-height: 90%;
    img{
      border-radius: 5px;
    }
  }

  .catergories-selector{
    cursor: pointer;
    display: flex;
    padding: 12px 16px;
    align-items: center;
    gap: 4px;
    border-radius: 40px;
    background: $color-gray-600;
    font-weight: $font-weight-medium;
  }

  .nav{
    display: flex;
    align-items: center;
    .nav-item{
      height: 32px;
      display: flex;
      align-items: center;
      gap: 4px;
      &:not(:last-child){
        margin-right: 36px;
        padding-right: 31px;
        border-right: 1px solid $color-gray-300;
      }
      &_link{
        color: $color-green;
        font-weight: $font-weight-medium;
      }
    }
  }

  .account{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 4px 4px 12px;
    background-color: $color-gray-600;
    border-radius: 24px;
    .burger-menu{
      cursor: pointer;
    }
    img{
      border-radius: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 1200px) {
  .annonce-header{
    &__left-content{
      width: 100%;
      justify-content: space-between;
      gap: 10px;
      .burger-menu{
        display: flex;
      }
      .cart{
        display: flex;
      }
      .catergories-selector{
        display: none;
      }
    }
    &__right-content{
      display: none;
    }
  }
}

@media (max-width: 576px) {
  .annonce-header{
    padding: 8px;
  }
}
</style>
