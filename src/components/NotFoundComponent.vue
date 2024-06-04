<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '@/components/ButtonComponent.vue';

const props = defineProps<{
  descriptionText: string;
}>();
const buttonText = 'Go back home';
const router = useRouter();

const handleClick = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="vuekemon--not-found">
    <h2 class="vuekemon--not-found-title">Uh-oh!</h2>
    <p class="vuekemon--not-found-description">{{ props.descriptionText }}</p>
    <Button
      type="primary"
      @click="handleClick"
      >{{ buttonText }}</Button
    >
  </div>
</template>

<style lang="scss">
.vuekemon--not-found {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &-title {
    font-size: 36px;
    font-weight: $fonts--fw-bold;
    line-height: 42px;
    margin: 24px 0 12px;
  }

  &-description {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 24px;
  }
}
</style>
