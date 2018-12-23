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
  // If the user is logged in, `data` will contain the user's information.
  // If the user isn't logged in, a 401 Unauthorized error will be returned.
  const [err, data] = await call(axios.get('/api/users/me'));
  if (data) {
    store.commit('setCurrentUser', data.data.content);
  }
  else {
    store.commit('setCurrentUser', null);
  }

  // If the requested route is guest-only and the user is logged in
  if (to.matched.some(record => record.meta.guest) && data) {
    return next('/');
  }

  // If the requested route needs authorization and the user is not logged in
  if (to.matched.some(record => record.meta.authorized) && err) {
    return next({ path: '/login', query: { n: to.fullPath } });
  }

  next();
});

export default router;
