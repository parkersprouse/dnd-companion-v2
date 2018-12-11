import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
