// src/store/index.ts
import { defineStore } from 'pinia';

export interface Pokemon {
  name: string;
  url: string;
  isFavorite?: boolean;
  details?: any /** TODO: CHANGE AFTER TESTING INTERFACE */;
}

interface State {
  pokemonList: Pokemon[];
  favorites: string[];
  searchTerm: string;
}

export const usePokemonStore = defineStore('pokestore', {
  state: (): State => ({
    pokemonList: [],
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    searchTerm: ''
  }),
  actions: {
    async fetchPokemonList() {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=-1'
      );
      const data = await response.json();
      this.pokemonList = data.results.map((pokemon: Pokemon) => ({
        ...pokemon,
        isFavorite: this.favorites.includes(pokemon.name)
      }));
    },
    async fetchPokemonDetails(name: string) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      const pokemon = this.pokemonList.find((p) => p.name === name);
      if (pokemon) {
        pokemon.details = data;
      }
    },
    toggleFavorite(pokemonName: string) {
      const index = this.favorites.indexOf(pokemonName);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(pokemonName);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    setSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
    }
  },
  getters: {
    filteredPokemonList: (state) => {
      return state.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    favoritePokemon: (state) => {
      return state.pokemonList.filter((pokemon) =>
        state.favorites.includes(pokemon.name)
      );
    }
  }
});
