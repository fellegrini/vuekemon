<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition
      name="slide"
      mode="out-in"
    >
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="scss">
@import '@/assets/scss/_reset.scss';

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.5);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
