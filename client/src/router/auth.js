import axios from 'axios';

import { call } from '../lib';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/Register.vue'),
    meta: { guest: true },
  },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    component: () => import('../pages/ForgotPassword.vue'),
    meta: { guest: true },
  },
  {
    path: '/account_recovery',
    name: 'account_recovery',
    component: () => import('../pages/AccountRecovery.vue'),
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
];
