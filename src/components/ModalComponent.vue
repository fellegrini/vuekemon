<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import CrossIcon from './icons/CrossIcon.vue';

const props = defineProps<{ visible: boolean }>();
const emits = defineEmits(['close']);

onMounted(() => {
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') emits('close');
  });
});

onUnmounted(() => {
  window.removeEventListener('keyup', (e) => {
    if (e.key === 'Escape') emits('close');
  });
});
</script>

<template>
  <div
    v-if="props.visible"
    class="vuekemon--modal"
    @click.self="emits('close')"
  >
    <div class="vuekemon--modal-content">
      <button
        class="vuekemon--modal-close"
        @click="emits('close')"
      >
        <CrossIcon />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vuekemon--modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;

  @include breakpoint('sm') {
    padding: 0 24px;
  }

  @include breakpoint('md') {
    padding: 0 120px;
  }

  @include breakpoint('lg') {
    padding: 0 212px;
  }

  @include breakpoint('xl') {
    padding: 0 360px;
  }

  @include breakpoint('xxl') {
    padding: 0 640px;
  }

  &-content {
    background-color: #fff;
    border-radius: $border--radius;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  &-close {
    display: grid;
    place-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
  }
}
</style>
