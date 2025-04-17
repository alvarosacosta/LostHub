import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ItemsView from '@/views/ItemsView.vue'
import ItemDetailsView from '@/views/ItemDetailsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'lost-objects',
    component: ItemsView,
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
    component: () => import('@/views/SignUpView.vue'),
    meta: { hasSidebar: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { hasSidebar: true }
  },
  {
    path: '/item/:id',
    name: 'item-details',
    component: ItemDetailsView,
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
