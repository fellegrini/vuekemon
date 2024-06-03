<script setup lang="ts">
import BottomBar from '@/components/BottomBarComponent.vue';
import PokemonList from '@/components/PokemonListComponent.vue';
import PokeballIcon from '@/components/icons/PokeballIcon.vue';
</script>

<template>
  <section class="vuekemon--podedex">
    <Suspense>
      <template #default>
        <div class="vuekemon--pokedex-list">
          <PokemonList />
          <BottomBar />
        </div>
      </template>
      <template #fallback>
        <div class="vuekemon--pokeball-loader">
          <PokeballIcon />
        </div>
      </template>
    </Suspense>
    <BottomBar />
  </section>
</template>

<style lang="scss">
.vuekemon--podedex,
.vuekemon--pokeball-loader {
  min-height: 100vh;
  width: 100%;
  background-color: $colors--background;
  display: grid;
  place-items: center;
}

.vuekemon--pokedex-list {
  height: 100%;
  width: 100%;
  padding: 24px;
}

.vuekemon--pokeball-loader {
  z-index: 3;
}
</style>
