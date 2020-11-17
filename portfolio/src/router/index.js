import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Contact from '../views/Contact'
import Project from '../views/Project'

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
    path: '/projects/:projectCategory',
    name: 'Projects',
    component: Project
  },
  {
    path: '/projects/:projectCategory/:projectSubCategory?/:projectName?',
    name: 'Projects',
    component: Project
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }
})

export default router
