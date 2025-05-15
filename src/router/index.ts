import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landing-page',
    component: () => import('@/views/LandingPageView.vue'),
    meta: { hasSidebar: false }
  },
  {
    path: '/hub',
    name: 'hub',
    component: () => import('@/views/ItemsView.vue'),
    meta: { hasSidebar: true }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('@/views/NotificationListView.vue'),
    meta: { hasSidebar: true }
  },
  {
    path: '/own-items',
    name: 'own-items',
    component: () => import('@/views/OwnItemsView.vue'),
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
    path: '/postItem',
    name: 'postItem',
    component: () => import('@/views/CreateItemView.vue'),
    meta: { hasSidebar: false }
  },
  {
    path: '/notifyFinding/:itemID',
    name: 'notify-finding',
    component: () => import('@/views/NotifyFindingView.vue'),
    meta: { hasSidebar: false },
    props: true
  },
  {
    path: '/profile/:userID',
    name: 'foreign-profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { hasSidebar: false },
    props: true
  },
  {
    path: '/item/:id',
    name: 'item-details',
    component: () => import('@/views/ItemDetailsView.vue'),
    meta: { hasSidebar: false },
    props: true
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router
