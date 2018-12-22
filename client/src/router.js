import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';
import { call } from './lib';

Vue.use(Router);

let user = null;
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { user },
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
      props: { user },
      meta: { guest: true },
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
    console.log(data.data.content);
    user = data.data.content;
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
