import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Courses from '../pages/Courses.vue';

const routes = [
  { path: '/', component: Courses },
  { path: '/login', component: Login }
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
