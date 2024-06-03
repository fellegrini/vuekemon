<script setup lang="ts">
import { ref } from 'vue';
import { usePokemonStore, type Pokemon } from '@/store/pokestore';
import StarComponent from '@/components/StarComponent.vue';

const pokemonStore = usePokemonStore();
const displayedPokemon = ref<Pokemon[]>([]);
const limit = ref(20);
const pokemonListRef = ref<HTMLUListElement | null>(null);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadPokemonList = async () => {
  await delay(3000); // Delay for 3 seconds for improved UX (shows Suspense fallback in the meantime).
  await pokemonStore.fetchPokemonList().catch((e) => {
    console.error(e);
  });
  displayedPokemon.value = pokemonStore.filteredPokemonList.slice(
    0,
    limit.value
  );
};

await loadPokemonList();

const handleScroll = () => {
  if (pokemonListRef.value) {
    const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.value;
    const bottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (
      bottom &&
      displayedPokemon.value.length < pokemonStore.filteredPokemonList.length
    ) {
      limit.value += 20;
      displayedPokemon.value = pokemonStore.filteredPokemonList.slice(
        0,
        limit.value
      );
    }
  }
};

const toggleFavorite = (pokemon: Pokemon) => {
  pokemonStore.toggleFavorite(pokemon.name);
  pokemon.isFavorite = !pokemon.isFavorite;
};
</script>

<template>
  <ul
    v-if="displayedPokemon.length > 0"
    class="vuekemon--pokemon-list"
    @scroll="handleScroll"
    ref="pokemonListRef"
  >
    <li
      class="vuekemon--pokemon-list-item"
      v-for="pokemon in displayedPokemon"
      :key="pokemon.name"
      :pokemon="pokemon"
    >
      <button class="vuekemon--pokemon-list-button">
        {{ pokemon.name }}
      </button>
      <StarComponent
        :isFavorite="pokemon.isFavorite"
        @click="toggleFavorite(pokemon)"
      />
    </li>
  </ul>
  <!-- TODO: Refactor -->
  <div
    v-else
    class="vuekemon--pokemon-list-empty"
  >
    The server does not respond.
  </div>
</template>

<style scoped lang="scss">
.vuekemon--pokemon-list {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin-bottom: 8px;
    background-color: $colors--white;
    padding-right: 8px;
  }

  &-button {
    height: 100%;
    width: 100%;
    background-color: $colors--white;
    font-size: 18px;
    font-family: $fonts--lato;
    font-weight: $fonts--fw-bold;
    text-align: left;
    padding: 0 0 0 20px;
  }
}
</style>
