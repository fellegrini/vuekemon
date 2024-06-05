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
      class="vuekemon--home-button"
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

  @include breakpoint('sm') {
    padding: 48px 48px 128px;
  }

  @include breakpoint('md') {
    padding: 48px 80px 128px;
  }

  @include breakpoint('lg') {
    padding: 48px 240px;
  }

  @include breakpoint('xl') {
    padding: 48px 480px;
  }

  @include breakpoint('xxl') {
    padding: 48px 720px;
  }

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

  &-button {
    max-width: 140px;
  }
}
</style>
