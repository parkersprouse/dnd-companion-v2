import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import { call } from '../lib';
import store from '../store';
import auth from './auth';
// import characters from './characters';
import dnd_info from './dnd_info';
// import games from './games';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...auth,
    // ...characters,
    ...dnd_info,
    // ...games,
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue'),
    },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    //   meta: { authorized: true },
    // },
    // {
    //   path: '*',
    //   name: 'not_found',
    //   component: () => import(/* webpackChunkName: "not_found" */ '../views/NotFound.vue'),
    // },
  ],
});

router.beforeEach(async (to, from, next) => {
  // If the user is logged in, `data` will contain the user's information.
  // If the user isn't logged in, a 401 Unauthorized error will be returned.
  const [err, data] = await call(axios.get('/api/users/me'));
  if (data) {
    store.commit('setState', { name: 'current_user', value: data.data.content });
  } else {
    store.commit('setState', { name: 'current_user', value: {} });
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
