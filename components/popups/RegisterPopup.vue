<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      >
      <button type="submit">
        Register
      </button>
      <p>
        Already have an account? <button @click="switchToLogin">
          Login
        </button>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const email = ref('')
const password = ref('')

const emit = defineEmits(['switchForm'])

const authStore = useAuthStore()

const onSubmit = async () => {
  try {
    await authStore.register(email.value, password.value)
  } catch (error) {
    // Handle registration error
  }
}

const switchToLogin = () => {
  emit('switchForm')
}
</script>
