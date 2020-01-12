import axios from 'axios';

import { call } from '../lib';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: { guest: true },
  },
  // {
  //   path: '/forgot_password',
  //   name: 'forgot_password',
  //   component: () => import(/* webpackChunkName: "forgot_password" */ '../views/ForgotPassword.vue'),
  //   meta: { guest: true },
  // },
  // {
  //   path: '/account_recovery',
  //   name: 'account_recovery',
  //   component: () => import(/* webpackChunkName: "account_recovery" */ '../views/AccountRecovery.vue'),
  //   meta: { guest: true },
  // },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
      await call(axios.get('/api/logout'));
      next('/');
    },
  },
];
