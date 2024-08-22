<template>
  <div class="agents-page">
    <company-card v-bind="company" />
    <div class="agents-page__agents">
      <agent-card
        v-for="agent in agents"
        :key="`agent-${agent.id}`"
        v-bind="agent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: company } = await useAsyncData('company', () => $fetch('/api/company/details'))
const { data: agents } = await useAsyncData('agents', () => $fetch('/api/company/agents'))

</script>

<style scoped lang="scss">
.agents-page{
  &__agents{
    margin-top: 32px;
    margin-bottom: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
}
</style>
