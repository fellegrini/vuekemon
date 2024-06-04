<script setup lang="ts">
import { ref, watch } from 'vue';
import MagnifierIcon from '@/components/icons/MagnifierIcon.vue';

const searchTerm = ref('');
const emits = defineEmits(['search']);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

watch(searchTerm, (newTerm) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    emits('search', newTerm);
    debounceTimeout = null;
  }, 300);
});
</script>

<template>
  <div class="vuekemon--search-bar">
    <MagnifierIcon class="vuekemon--search-bar-icon" />
    <input
      type="text"
      name="search"
      v-model="searchTerm"
      placeholder="Search"
      class="vuekemon--search-bar-input"
    />
  </div>
</template>

<style lang="scss">
.vuekemon--search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: $colors--white;
  border-radius: $border--radius;
  margin: 8px 0 24px;
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 3, 0.03);

  &-icon {
    min-height: 18px;
    min-width: 18px;
    margin: 0 16px;
  }

  &-input {
    height: 100%;
    width: 100%;
    border: none;
    font-size: 16px;
    font-weight: 500;
    font-family: $fonts--montserrat;
    border-radius: $border--radius;
    padding: 0;
    padding-left: 6px;
  }
}
</style>
