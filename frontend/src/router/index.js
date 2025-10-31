import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import SheetsDashboard from '../components/SheetsDashboard.vue'
import SheetEditor from '../components/SheetEditor.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: SheetsDashboard, meta: { requiresAuth: true } },
    { path: '/sheet/:id', component: SheetEditor, meta: { requiresAuth: true } },
    { path: '/', redirect: '/dashboard' },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router