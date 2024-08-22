<template>
  <button
    :class="[
      'annonce-button',
      ...computedButtonClasses,
      { 'disabled': disabled }
    ]"
    :autofocus="autofocus"
    :disabled="disabled"
    :form="form"
    :name="name"
    :type="type"

    @click="handleClick($event)"
  >
    <slot>
      {{ value }}
    </slot>
  </button>
</template>

<script setup lang="ts">

const props = defineProps({
// Default Button Props
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: null },
  name: { type: String, default: null },
  type: { type: String as () => 'button' | 'submit' | 'reset' | undefined, default: 'button' },
  value: { type: [String, Number], default: null },

  // Custom Button Props
  buttonClasses: { type: Array as () => Array<string>, default: () => ['default'] }
})

const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  if (!props.disabled) { emit('click', e) }
}

const computedButtonClasses = computed(() => {
  return props.buttonClasses.map(buttonClass => `annonce-button_${buttonClass}`)
})

</script>

<style lang="scss" scoped>
.annonce-button{
  display: flex;
  width: fit-content;
  padding: 14px 18px;
  border: none;
  line-height: 160%;
  align-items: center;
  justify-content: center;
  appearance: none;
  border-radius: 12px;
  font-family: $font-family-primary;
  font-weight: $font-weight-medium;
  font-size: $font-size-sm;
  transition: all 0.1s ease-in;

  &_default{
    border: 2px solid $color-green;
    background-color: $color-green;
    color: $color-white;
    transition: all 0.4s ease-in-out;

    &:hover{
      background-color: transparent;
      color: $color-black;
    }
  }

  &_small{
    padding: 6px 10px;
  }
}
</style>
