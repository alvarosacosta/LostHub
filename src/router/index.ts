import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LostObjectsView from '@/views/LostObjectsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'lost-objects',
    component: LostObjectsView,
    meta: { hasSidebar: true }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/views/AboutUsView.vue'),
    meta: { hasSidebar: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router
