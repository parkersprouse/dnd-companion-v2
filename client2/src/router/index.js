import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import { call } from '../lib';
import store from '../store';
import auth from './auth';
// import characters from './characters';
import dnd_info from './dnd_info';
// import games from './games';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    ...auth,
    // ...characters,
    ...dnd_info,
    // ...games,
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue'),
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
    store.commit('setCurrentUser', data.data.content);
  } else {
    store.commit('setCurrentUser', {});
  }

  // If the requested route is guest-only and the user is logged in
  if (to.matched.some(record => record.meta.guest) && data) {
    return next('/');
  }

  // If the requested route needs authorization and the user is not logged in
  if (to.matched.some(record => record.meta.authorized) && err) {
    return next({ path: '/login', query: { n: to.fullPath } });
  }

  return next();
});

export default router;
