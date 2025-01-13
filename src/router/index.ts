import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import CvView from "@/views/CvView.vue"
import GameGalaxyView from '../views/GameGalaxyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games/galaxy',
      name: 'game-galaxy-view',
      component: GameGalaxyView,
    },
    {
      path: '/cv',
      name: 'cv-view',
      component: CvView,
    }
  ],
})

export default router
