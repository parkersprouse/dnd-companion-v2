import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import { call } from './lib';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
      meta: { guest: true },
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        await call(axios.get('/api/logout'));
        next('/');
      },
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const [err, data] = await call(axios.get('/api/users/me'));
  if (data) {
    store.commit('setCurrentUser', data.data.content);
  }
  else {
    store.commit('setCurrentUser', null);
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (data) {
      return next('/');
    }
  }
  else if (to.matched.some(record => record.meta.authorized)) {
    if (err) {
      return next({ path: '/', query: { n: to.fullPath } });
    }
  }

  next();
});

export default router;
