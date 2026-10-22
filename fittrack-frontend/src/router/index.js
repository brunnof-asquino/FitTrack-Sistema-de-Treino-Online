import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/feed/all', name: 'feed-all', component: () => import('../views/FeedAllView.vue'), meta: { requiresAuth: true } },
  { path: '/feed/follow', name: 'feed-follow', component: () => import('../views/FeedFollowView.vue'), meta: { requiresAuth: true } },
  { path: '/feed/suggestions', name: 'feed-suggestions', component: () => import('../views/SuggestionsFeedView.vue'), meta: { requiresAuth: true } },
  { path: '/workout/upload', name: 'workout-upload', component: () => import('../views/UploadView.vue'), meta: { requiresAuth: true } },
  { path: '/workout/:id', name: 'workout-detail', component: () => import('../views/WorkoutDetailView.vue'), meta: { requiresAuth: true } },
  { path: '/workout/:id/edit', name: 'workout-edit', component: () => import('../views/EditWorkoutDetailView.vue'), meta: { requiresAuth: true } },
  { path: '/liked-workouts', name: 'liked-workouts', component: () => import('../views/LikedWorkoutsView.vue'), meta: { requiresAuth: true } },
  { path: '/my-workouts', name: 'my-workouts', component: () => import('../views/MyWorkoutView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/me', name: 'my-profile', component: () => import('../views/profile/MyProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/:username', name: 'public-profile', component: () => import('../views/profile/PublicProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/search', name: 'search', component: () => import('../views/SearchView.vue'), meta: { requiresAuth: true } },
  { path: '/notifications', name: 'notifications', component: () => import('../views/NotificationsView.vue'), meta: { requiresAuth: true } },
  // Admin Routes
  { path: '/admin/dashboard', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboardView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/users', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/workouts', name: 'admin-workouts', component: () => import('../views/admin/AdminWorkoutView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/workouts/upload', name: 'admin-upload-workout', component: () => import('../views/admin/AdminUploadWorkoutView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/categories', name: 'admin-categories', component: () => import('../views/admin/AdminCategoryView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/categories/upload', name: 'admin-upload-category', component: () => import('../views/admin/AdminUploadCategoryView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  // Not Found
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router