import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BlogsView from '../views/BlogsView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import BlogsRead from '../views/BlogsRead.vue'
import BlogsCreateView from '../views/BlogsCreateView.vue'
import Profile from '../views/Profile.vue';
import store from '../store';
function alreadyLogin(to,from,next){
  if(store.state.auth){
    return next('/')
  }
  return next();
}

function needAuth(to,from,next){
  if(store.state.auth === null){
    return next('/login')
  }
  return next();
  
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/blogs', name: 'blogs', component: BlogsView },
    { path: '/login', 
    name: 'login', 
    component: LoginView ,beforeEnter:alreadyLogin },
    { path: '/register', name: 'register', component: RegisterView ,beforeEnter:alreadyLogin },
    { path: '/blogs/create', name: 'blog.create', component: BlogsCreateView , beforeEnter: needAuth },
    { path: '/blogs/:id', name: 'blog.view', component: BlogsRead },
    { path: '/profile', name: 'profile', component: Profile , beforeEnter: needAuth },
  ]
})

export default router
