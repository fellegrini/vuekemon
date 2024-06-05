<script setup lang="ts">
import StarIcon from '@/components/icons/StarIcon.vue';

const props = defineProps<{
  isFavorite?: boolean;
}>();
</script>

<template>
  <button class="vuekemon--star">
    <StarIcon
      class="vuekemon--star-icon"
      :fill="props.isFavorite ? '#eca539' : '#bfbfbf'"
    />
  </button>
</template>

<style lang="scss">
.vuekemon--star {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  background-color: $colors--background;
  transition: background-color 0.3s;

  &:hover,
  &:focus,
  &:active {
  }
}
</style>
