<template>
  <button
    :class="buttonClass"
    type="button"
    :disabled="disabled"
  >
    <span
      v-if="icon"
      class="button--icon"
    >
      <component :is="icon"></component>
    </span>
    <span class="button--text">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary'
    },
    icon: {
      type: Object as PropType<ReturnType<typeof defineComponent>>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const buttonClass = computed(() => ({
      'vuekemon--button': true,
      'button--primary': props.type === 'primary',
      'button--secondary': props.type === 'secondary'
    }));

    return {
      buttonClass
    };
  }
});
</script>

<style scoped lang="scss">
.vuekemon--button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border: none;
  border-radius: 60px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  font-family: $fonts--lato;
  font-weight: $fonts--fw-bold;

  &.button--primary {
    background-color: $colors--red-light;
    color: $colors--white;

    &:hover:not(:disabled) {
      background-color: $colors--red;
    }

    &:active:not(:disabled) {
      background-color: $colors--red;
    }
  }

  &.button--secondary {
    background-color: $colors--grey-light;
    color: $colors--black;
  }

  &:disabled {
    background-color: $colors--grey-light;
    color: $colors--white;
    cursor: not-allowed;
  }

  .button--icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
    height: 22px;
    width: 22px;
  }

  .button--text {
    display: flex;
    align-items: center;
  }
}
</style>
