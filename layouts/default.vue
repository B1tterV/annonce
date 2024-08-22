<template>
  <div class="layout">
    <AnnonceHeader @login="loginPopupIsOpen = true" />
    <main class="layout__content">
      <NuxtPage />
    </main>
    <AnnonceFooter />
    <AuthPopup
      v-if="loginPopupIsOpen && !user"
      @close="loginPopupIsOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const loginPopupIsOpen = ref<boolean>(false)
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
  }
}
</style>
