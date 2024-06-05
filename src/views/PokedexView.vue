<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore, type Pokemon } from '@/store/pokestore';
import SearchBar from '@/components/SearchBarComponent.vue';
import BottomBar from '@/components/BottomBarComponent.vue';
import PokemonList from '@/components/PokemonListComponent.vue';
import PokeballIcon from '@/components/icons/PokeballIcon.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import PokemonSummary from '@/components/PokemonSummaryComponent.vue';

const pokemonStore = usePokemonStore();
const modalVisible = ref(false);
const selectedPokemon = ref<Pokemon | null>(null);

const handleViewChange = (view: 'all' | 'favorites') => {
  pokemonStore.setView(view);
};

const handleSearch = (searchTerm: string) => {
  pokemonStore.setSearchTerm(searchTerm);
};

const showModal = async (pokemonName: string) => {
  await pokemonStore.fetchPokemonDetails(pokemonName);
  selectedPokemon.value =
    pokemonStore.pokemonList.find((p) => p.name === pokemonName) || null;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <section class="vuekemon--pokedex">
    <Suspense>
      <template #default>
        <div class="vuekemon--pokedex-list">
          <SearchBar @search="handleSearch" />
          <PokemonList @show-modal="showModal" />
          <BottomBar
            @change-active="handleViewChange"
            :has-favorites="!!pokemonStore.getHasFavorites"
          />
        </div>
      </template>
      <template #fallback>
        <div class="vuekemon--pokeball-loader">
          <PokeballIcon />
        </div>
      </template>
    </Suspense>
    <Transition
      name="fade"
      mode="out-in"
    >
      <ModalComponent
        :visible="modalVisible"
        @close="closeModal"
      >
        <template v-if="selectedPokemon">
          <PokemonSummary :pokemon="selectedPokemon" />
        </template>
      </ModalComponent>
    </Transition>
  </section>
</template>

<style lang="scss">
.vuekemon--pokedex,
.vuekemon--pokeball-loader {
  min-height: 100%;
  width: 100%;
  background-color: $colors--background;
  display: grid;
  place-items: center;
}

.vuekemon--pokedex-list {
  height: 100%;
  width: 100%;
  padding: 24px;

  @include breakpoint('sm') {
    padding: 24px 48px;
  }

  @include breakpoint('md') {
    padding: 32px 80px;
  }

  @include breakpoint('lg') {
    padding: 32px 240px;
  }

  @include breakpoint('xl') {
    padding: 32px 360px;
  }

  @include breakpoint('xxl') {
    padding: 48px 480px;
  }
}

.vuekemon--pokeball-loader {
  z-index: 3;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
