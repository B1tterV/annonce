<template>
  <popup-wrapper
    :is-visible="isModalVisible"
    @update:is-visible="$emit('close', $event)"
  >
    <component :is="currentForm" @switch-form="switchForm" />
  </popup-wrapper>
</template>

<script setup lang="ts">
import LoginForm from '@/components/popups/LoginPopup.vue'
import RegisterForm from '@/components/popups/RegisterPopup.vue'

const isModalVisible = ref(true)

const isLogin = ref(true)

defineEmits(['close'])

const currentForm = computed(() => isLogin.value ? LoginForm : RegisterForm)

const switchForm = () => {
  isLogin.value = !isLogin.value
}
</script>

<style scoped>
</style>
