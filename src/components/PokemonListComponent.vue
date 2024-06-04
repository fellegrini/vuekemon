<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePokemonStore, type Pokemon } from '@/store/pokestore';
import capitalizeFirstLetter from '@/utils/capitalize';
import Star from '@/components/StarComponent.vue';
import NotFound from '@/components/NotFoundComponent.vue';

const pokemonStore = usePokemonStore();
const displayedPokemon = ref<Pokemon[]>([]);
const limit = ref(20);
const pokemonListRef = ref<HTMLUListElement | null>(null);
const emits = defineEmits(['show-modal']);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadPokemonList = async () => {
  await delay(3000); // Delay for 3 seconds to show the fallback
  await pokemonStore.fetchPokemonList().catch((e) => {
    console.error(e);
  });
  updateDisplayedPokemon();
};

const updateDisplayedPokemon = () => {
  displayedPokemon.value = pokemonStore.filteredPokemonList.slice(
    0,
    limit.value
  );
};

const handleScroll = () => {
  if (pokemonListRef.value) {
    const { scrollTop, scrollHeight, clientHeight } = pokemonListRef.value;
    const bottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (
      bottom &&
      displayedPokemon.value.length < pokemonStore.filteredPokemonList.length
    ) {
      limit.value += 20;
      updateDisplayedPokemon();
    }
  }
};

const toggleFavorite = (pokemon: Pokemon) => {
  pokemonStore.toggleFavorite(pokemon.name);
  pokemon.isFavorite = !pokemon.isFavorite;
};

const showDetails = (pokemonName: string) => {
  emits('show-modal', pokemonName);
};

await loadPokemonList();

watch(
  () => [pokemonStore.view, pokemonStore.searchTerm],
  () => {
    limit.value = 20;
    updateDisplayedPokemon();
  }
);
</script>

<template>
  <ul
    v-if="displayedPokemon.length > 0"
    class="vuekemon--pokemon-list"
    @scroll="handleScroll"
    ref="pokemonListRef"
  >
    <TransitionGroup name="list">
      <li
        class="vuekemon--pokemon-list-item"
        v-for="pokemon in displayedPokemon"
        :key="pokemon.name"
        @click="showDetails(pokemon.name)"
      >
        <button class="vuekemon--pokemon-list-button">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </button>
        <Star
          :isFavorite="pokemon.isFavorite"
          @click.stop="toggleFavorite(pokemon)"
        />
      </li>
    </TransitionGroup>
  </ul>
  <div
    v-else
    class="vuekemon--pokemon-list-empty"
  >
    <NotFound
      :descriptionText="
        pokemonStore.errorMessage || 'You look lost on your journey!'
      "
    />
  </div>
</template>

<style scoped lang="scss">
.vuekemon--pokemon-list {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  padding-bottom: 120px;

  &::-webkit-scrollbar {
    display: none;
  }

  &-empty {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    background-color: $colors--background;
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 3;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin-bottom: 8px;
    background-color: $colors--white;
    padding-right: 8px;
    border-radius: $border--radius;
    gap: 8px;
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

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
  }

  .list-leave-active {
    transform: translateX(100%);
  }
}
</style>
