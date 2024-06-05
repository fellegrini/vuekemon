<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { usePokemonStore } from './store/pokestore';
const router = useRouter();
const store = usePokemonStore();

router.beforeEach(() => {
  store.setSearchTerm('');
  store.setErrorMessage('');
  store.setView('all');
});
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.5);
}

.slide-enter-from:not(.vuekemon--home),
.slide-leave-to {
  transform: translateY(-99%);
  opacity: 0;
}

.slide-enter-from {
  /* Fixes an issue where Lighthouse couldn't detect the LCP element */
  opacity: 0.01;
}
</style>
