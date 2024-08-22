<template>
  <div class="error-page">
    {{ error }}
    <nuxt-link to="/">
      Go back to home page
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { error } = useError()
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
</style>
