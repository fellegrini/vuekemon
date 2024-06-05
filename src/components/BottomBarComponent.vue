<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ButtonComponent.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import SingleStar from '@/components/icons/SingleStarIcon.vue';

const activeButton = ref<'all' | 'favorites'>('all');
const emit = defineEmits(['changeActive']);
const props = defineProps<{
  hasFavorites: boolean;
}>();

const setActiveButton = (button: 'all' | 'favorites') => {
  activeButton.value = button;
  emit('changeActive', button);
};
</script>

<template>
  <footer class="vuekemon--bottom-bar">
    <Button
      :icon="MenuIcon"
      :type="activeButton === 'all' ? 'primary' : 'secondary'"
      @click="setActiveButton('all')"
    >
      All
    </Button>
    <Button
      :icon="SingleStar"
      :type="activeButton === 'favorites' ? 'primary' : 'secondary'"
      :disabled="!props.hasFavorites"
      @click="setActiveButton('favorites')"
    >
      Favorites
    </Button>
  </footer>
</template>

<style lang="scss">
.vuekemon--bottom-bar {
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-around;
  padding: 24px 16px;
  width: 100%;
  background-color: $colors--white;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -5px 4px 0px rgba(0, 0, 3, 0.03);

  @include breakpoint('md') {
    padding: 24px;
  }

  @include breakpoint('lg') {
    padding: 32px 240px;
    gap: 24px;
  }

  @include breakpoint('xl') {
    padding: 32px 360px;
  }

  @include breakpoint('xxl') {
    padding: 32px 480px;
  }
}

.vuekemon--button {
  width: 150px;

  @include breakpoint('sm') {
    width: 240px;
  }

  @include breakpoint('lg') {
    width: 100%;
  }
}
</style>
