<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';

const buttonText = 'Get started';
</script>

<template>
  <section class="vuekemon--home">
    <ButtonComponent type="primary">{{ buttonText }}</ButtonComponent>
  </section>
</template>

<style></style>

<!-- @click="$router.push({ name: 'pokedex' })" -->
