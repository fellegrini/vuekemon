import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('pokestore', () => {
  const pokeList = ref([]);
  return {};
});
