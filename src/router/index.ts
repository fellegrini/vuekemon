import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/PokedexView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dex',
      name: 'pokedex',
      component: () => import('@/views/PokedexView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
});

export default router;
