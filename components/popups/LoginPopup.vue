<template>
  <div>
    <h2>Login</h2>
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
        Login
      </button>
      <p>
        Don't have an account?
        <button @click="switchToRegister">
          Register
        </button>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const emit = defineEmits(['switchForm'])

const onSubmit = async () => {
  try {
    await authStore.login(email.value, password.value)
  } catch (error) {
    // Handle login error
  }
}

const switchToRegister = () => {
  emit('switchForm')
}
</script>
