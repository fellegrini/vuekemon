<script setup lang="ts">
import PokemonList from '@/components/PokemonList.vue';
import PokeballIcon from '@/components/icons/PokeballIcon.vue';
</script>

<template>
  <section class="vuekemon--podedex">
    <Suspense>
      <template #default>
        <PokemonList />
      </template>
      <template #fallback>
        <div class="vuekemon--pokeball-loader">
          <PokeballIcon />
        </div>
      </template>
    </Suspense>
  </section>
</template>

<style lang="scss">
.vuekemon--podedex {
  padding: 24px;
  height: 100vh;
  background-color: $colors--background;
  display: grid;
  place-items: center;
}
</style>
