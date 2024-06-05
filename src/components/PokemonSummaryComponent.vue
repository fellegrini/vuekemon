<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePokemonStore, type Pokemon } from '@/store/pokestore';
import missing from '../assets/img/missing.webp';
import Star from '@/components/StarComponent.vue';
import capitalizeFirstLetter from '@/utils/capitalize';
import Button from './ButtonComponent.vue';

const buttonText = ref('Share to my friends');
const pokemonStore = usePokemonStore();
const props = defineProps<{
  pokemon: Pokemon;
}>();

const toggleFavorite = (pokemon: Pokemon) => {
  pokemonStore.toggleFavorite(pokemon.name);
  pokemon.isFavorite = !pokemon.isFavorite;
};

const filteredDetails = computed(() => {
  if (props.pokemon.details) {
    return Object.entries(props.pokemon.details).filter(
      ([property]) => property !== 'types' && property !== 'spriteURL'
    );
  }
  return [];
});

// Utility function to get the types as a comma-separated string
const getTypesString = (
  types: { slot: number; type: { name: string; url: string } } | undefined
) => {
  if (types && Array.isArray(types)) {
    return types
      .map((type) => capitalizeFirstLetter(type.type.name))
      .join(', ');
  }
  return '';
};

const copyToClipboard = () => {
  if (props.pokemon.details) {
    const details = filteredDetails.value
      .map(
        ([property, value]) => `${capitalizeFirstLetter(property)}: ${value}`
      )
      .concat(`Type: ${getTypesString(props.pokemon.details.types)}`)
      .join(', ');
    const textToCopy = `${capitalizeFirstLetter(props.pokemon.name)} - ${details}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        buttonText.value = 'Copied to clipboard!';
        setTimeout(() => {
          buttonText.value = 'Share to my friends';
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
};
</script>

<template>
  <div class="vuekemon--pokemon-summary">
    <header class="vuekemon--pokemon-summary-banner">
      <img
        class="vuekemon--pokemon-summary-image"
        :src="props.pokemon.details?.spriteURL ?? missing"
        alt=""
      />
    </header>
    <ul class="vuekemon--pokemon-summary-stats">
      <li class="vuekemon--pokemon-summary-stat">
        <p class="vuekemon--pokemon-summary-label">Name:</p>
        {{ capitalizeFirstLetter(props.pokemon.name) }}
      </li>
      <li
        class="vuekemon--pokemon-summary-stat"
        v-for="([property, value], index) in filteredDetails"
        :key="index"
      >
        <p class="vuekemon--pokemon-summary-label">
          {{ capitalizeFirstLetter(property) }}:
        </p>
        {{ capitalizeFirstLetter(value.toString()) }}
      </li>
      <li
        class="vuekemon--pokemon-summary-stat"
        v-if="props.pokemon.details?.types"
      >
        <p class="vuekemon--pokemon-summary-label">Type:</p>
        {{ getTypesString(props.pokemon.details.types) }}
      </li>
    </ul>
    <footer class="vuekemon--pokemon-summary-footer">
      <Button
        class="vuekemon--pokemon-summary-button"
        type="primary"
        @click="copyToClipboard"
        :disabled="!props.pokemon.details"
      >
        {{ buttonText }}
      </Button>
      <Star
        :isFavorite="props.pokemon.isFavorite"
        @click.stop="toggleFavorite(props.pokemon)"
      />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.vuekemon--pokemon-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;

  &-banner {
    width: calc(100% + 2px);
    height: 220px;
    background-color: $colors--grey-light;
    background: url('../assets/img/background.webp') no-repeat center;
    background-size: cover;
    display: grid;
    place-items: center;
  }

  &-image {
    width: 220px;
    height: 220px;
    image-rendering: optimizeQuality;
    animation: bounce 0.5s linear forwards;
    animation-delay: 0.2s;
  }

  &-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 32px;
    width: 100%;
  }

  &-stat {
    width: 100%;
    display: flex;
    border-bottom: $border--bottom;
    font-size: 18px;
    line-height: 27px;
    padding: 10px 0;
  }

  &-label {
    font-weight: $fonts--fw-bold;
    margin-right: 4px;
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 0 32px 16px;
    margin-top: 8px;

    @include breakpoint('lg') {
      justify-content: space-between;
    }
  }

  &-button {
    flex: 1;
    margin-right: 16px;

    @include breakpoint('lg') {
      flex: 0;
    }
  }
}

@keyframes bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.3, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-100px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(-8px);
  }
  64% {
    transform: scale(1.1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
