<template>
  <div
    v-if="isVisible"
    class="popup-wrapper"
    @click="close"
  >
    <div class="popup-wrapper__content" @click.stop>
      <button class="popup-close" @click="close">
        ×
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  isVisible: { type: Boolean, default: true }
})

const emit = defineEmits(['update:isVisible'])

const close = () => {
  emit('update:isVisible', false)
}
</script>

<style scoped lang="scss">
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  &__content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
    position: relative;
  }
  .popup-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
}

</style>
