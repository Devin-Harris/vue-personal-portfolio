import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import app from '../main'
import Home from '../views/Home'
import Contact from '../views/Contact'
import Project from '../views/Project'
import InvalidRoute from '../components/navigation/invalid-route'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/projects/:projectCategory/:projectSubCategory?/:projectName?',
    name: 'Projects',
    component: Project
  },
  {
    path: "/:catchAll(.*)",
    name: 'Invalid',
    component: InvalidRoute
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }
})

router.beforeEach((to, from, next) => {
  if (!app.config.globalProperties.$ILLUSTRATION_KEY) app.config.globalProperties.$ILLUSTRATION_KEY = 1
  else ++app.config.globalProperties.$ILLUSTRATION_KEY
  next()
})

export default router
