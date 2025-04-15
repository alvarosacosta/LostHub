import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LostItemsView from '@/views/LostItemsView.vue'
import LostItemDetailsView from '@/views/LostItemDetailsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'lost-objects',
    component: LostItemsView,
    meta: { hasSidebar: true }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/views/AboutUsView.vue'),
    meta: { hasSidebar: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/SignInView.vue'),
    meta: { hasSidebar: false }
  },
  {
    path: '/item/:id',
    name: 'item-details',
    component: LostItemDetailsView,
    meta: { hasSidebar: false },
    props: true
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
