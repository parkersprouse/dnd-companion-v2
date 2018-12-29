import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import AccountRecovery from './pages/AccountRecovery.vue';
import NotFound from './pages/NotFound.vue';

import ArmorList from './pages/info/ArmorList.vue';
import EquipmentList from './pages/info/EquipmentList.vue';
import TrinketsList from './pages/info/TrinketsList.vue';

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
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true },
    },
    {
      path: '/forgot_password',
      name: 'forgot_password',
      component: ForgotPassword,
      meta: { guest: true },
    },
    {
      path: '/account_recovery',
      name: 'account_recovery',
      component: AccountRecovery,
      meta: { guest: true },
    },
    {
      path: '/info/armor',
      name: 'armor_list',
      component: ArmorList,
    },
    {
      path: '/info/equipment',
      name: 'equipment_list',
      component: EquipmentList,
    },
    {
      path: '/info/trinkets',
      name: 'trinket_list',
      component: TrinketsList,
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
