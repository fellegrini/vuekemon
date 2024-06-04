<script setup lang="ts">
import SearchBar from '@/components/SearchBarComponent.vue';
import BottomBar from '@/components/BottomBarComponent.vue';
import PokemonList from '@/components/PokemonListComponent.vue';
import PokeballIcon from '@/components/icons/PokeballIcon.vue';
import { usePokemonStore } from '@/store/pokestore';

const pokemonStore = usePokemonStore();

const handleViewChange = (view: 'all' | 'favorites') => {
  pokemonStore.setView(view);
};

const handleSearch = (searchTerm: string) => {
  pokemonStore.setSearchTerm(searchTerm);
};
</script>

<template>
  <section class="vuekemon--pokedex">
    <Suspense>
      <template #default>
        <div class="vuekemon--pokedex-list">
          <SearchBar @search="handleSearch" />
          <PokemonList />
          <BottomBar @change-active="handleViewChange" />
        </div>
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
.vuekemon--pokedex,
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
