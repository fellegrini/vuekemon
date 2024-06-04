<script setup lang="ts">
import Button from '@/components/ButtonComponent.vue';
import PikaIcon from '@/components/icons/PikaIcon.vue';

const buttonText = 'Get started';
const headlineText = 'Welcome to Pokédex';
const descriptionText =
  'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.';
</script>

<template>
  <section class="vuekemon--home">
    <PikaIcon />
    <h1 class="vuekemon--home-headline">{{ headlineText }}</h1>
    <p class="vuekemon--home-description">{{ descriptionText }}</p>
    <Button
      type="primary"
      @click="$router.push({ name: 'pokedex' })"
      >{{ buttonText }}</Button
    >
  </section>
</template>

<style scoped lang="scss">
.vuekemon--home {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 48px 16px 128px;
  height: 100%;
  overflow: hidden;
  text-align: center;

  &-headline {
    color: $colors--black;
    font-size: 26px;
    font-weight: $fonts--fw-bold;
    line-height: 32px;
    margin-top: 56px;
  }

  &-description {
    font-size: 18px;
    line-height: 27px;
    color: $colors--grey;
    margin: 24px 0 48px 0;
    justify-self: center;
  }
}
</style>
