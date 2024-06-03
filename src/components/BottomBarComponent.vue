<script setup lang="ts">
import Button from '@/components/ButtonComponent.vue';
import MenuIcon from '@/components/icons/MenuIcon.vue';
import SingleStar from '@/components/icons/SingleStarIcon.vue';
</script>

<template>
  <footer class="vuekemon--bottom-bar">
    <Button
      :icon="MenuIcon"
      type="primary"
    >
      All
    </Button>
    <Button
      :icon="SingleStar"
      type="secondary"
    >
      Favorites
    </Button>
  </footer>
</template>

<style lang="scss">
.vuekemon--bottom-bar {
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-around;
  padding: 24px 16px;
  width: 100%;
  background-color: $colors--white;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -5px 4px 0px rgba(0, 0, 3, 0.03);
}

.vuekemon--button {
  width: 150px;
}
</style>
