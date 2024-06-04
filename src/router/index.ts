import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

enum RouteNames {
  home = 'home',
  pokedex = 'pokedex',
  notFound = '404'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.home,
      component: HomeView
    },
    {
      path: '/dex',
      name: RouteNames.pokedex,
      component: () => import('@/views/PokedexView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteNames.home,
      component: () => import('@/views/HomeView.vue')
    }
  ]
});

export default router;
