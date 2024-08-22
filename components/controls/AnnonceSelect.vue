<template>
  <div class="annonce-select">
    <div
      ref="selectionHeader"
      class="annonce-select__header"
      @click="toggleDropdown"
    >
      <span>{{ selectedOptionLabel }}</span>
      <Icon
        class="arrow"
        :class="{'arrow_reverse': isOpen}"
        name="annonce:drop-down-arrow"
      />
    </div>
    <Teleport to="body">
      <transition name="fade" @after-leave="onAfterLeave">
        <div
          v-if="isOpen"
          v-click-outside="closeDropdown"
          class="annonce-select__dropdown"
          :style="dropdownStyles"
        >
          <!-- Группировка опций -->
          <div
            v-for="group in groupedOptions"
            :key="String(group.groupLabel)"
            class="annonce-select__group"
          >
            <div v-if="group.groupLabel" class="annonce-select__group-label">
              {{ group.groupLabel }}
            </div>
            <div
              v-for="option in group.options"
              :key="String(option.value)"
              class="annonce-select__option"
              @click="selectOption(option)"
            >
              <span>{{ option.label }}
                <span
                  v-if="option.showCount"
                  class="annonce-select__option_count"
                >
                  {{ option.count }}
                </span>
              </span>
              <Icon
                v-if="option.value === selectedOption?.value"
                class="checkmark"
                name="annonce:checkmark"
              />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface Option {
  value: string | number | null;
  label: string;
  count: number;
  groupLabel?: string;
  showCount?: boolean; // Новое свойство
}

interface GroupedOption {
  groupLabel: string | null;
  options: Option[];
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number | null;
}>()

const emit = defineEmits(['update:modelValue'])
const selectionHeader = ref<HTMLElement | null>(null)
const isOpen = ref<boolean>(false)
const dropdownStyles = ref<{ top: string; left: string; width: string }>({ top: '0px', left: '0px', width: '100%' })

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick() // Дождаться обновления DOM
    updateDropdownPosition()
  }
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const updateDropdownPosition = () => {
  if (selectionHeader.value) {
    const rect = selectionHeader.value.getBoundingClientRect()
    dropdownStyles.value = {
      top: `${rect.bottom + window.scrollY + 10}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    }
  }
}

const selectedOption = computed(
  () => props.options.find(option => option.value === props.modelValue))
const selectedOptionLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : 'Выберите опцию'
})

// Группировка опций
const groupedOptions = computed(() => {
  const groups: GroupedOption[] = []
  props.options.forEach((option) => {
    const group = groups.find(g => g.groupLabel === option.groupLabel)
    if (group) {
      group.options.push(option)
    } else {
      groups.push({ groupLabel: option.groupLabel || null, options: [option] })
    }
  })
  return groups
})

watch(() => props.modelValue, (newValue) => {
  if (newValue === null || !props.options.some(opt => opt.value === newValue)) {
    emit('update:modelValue', null)
  }
}, { immediate: true })

const closeDropdown = () => {
  isOpen.value = false
}

const onAfterLeave = () => {
  // Очистка или дополнительные действия после закрытия
}

const handleResizeAndScroll = () => {
  if (isOpen.value) { updateDropdownPosition() }
}

onMounted(() => {
  window.addEventListener('resize', handleResizeAndScroll)
  window.addEventListener('scroll', handleResizeAndScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResizeAndScroll)
  window.removeEventListener('scroll', handleResizeAndScroll)
})
</script>

<style scoped lang="scss">
.annonce-select {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  font-family: var(--font-family);
  flex-direction: column;
  font-size: $font-size-sm;
}

.annonce-select__header {
  display: flex;
  max-width: 438px;
  width: 100%;
  padding: 15px;
  border: 1px solid $color-gray-100;
  color: var(--text-color);
  background: $color-gray-200;
  cursor: pointer;
  align-items: center;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    background: rgba($color-gray-200, 0.4)
  }
}

.arrow {
  transition: all 0.3s ease;
  &_reverse{
    transform: rotate(180deg);
  }
}

.checkmark {
  color: #00aaff; /* Цвет иконки checkmark */
  margin-left: 8px;
}

.annonce-select__dropdown {
  position: absolute;
  background: white;
  border: 1px solid var(--background-gray);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  max-height: 300px;
  overflow: auto;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.annonce-select__option {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_count{
    color: $color-gray-400;
  }
}

.annonce-select__option:hover {
  background-color: #f6f5f3;
}

/* Стили для группы опций */
.annonce-select__group {
  border-top: 1px solid var(--background-gray);
  &-label {
    padding: 24px 20px 8px 20px;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-gray-400;
  }
}

/* Анимация fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
