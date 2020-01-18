/* eslint-disable */

export default [
  {
    path: '/characters/new',
    name: 'create_character',
    component: () => import(/* webpackChunkName: "create_character" */ '../views/characters/CreateCharacter.vue'),
    meta: { authorized: true },
  },
  {
    path: '/characters/:id',
    name: 'show_character',
    component: () => import(/* webpackChunkName: "show_character" */ '../views/characters/ShowCharacter.vue'),
    meta: { authorized: true },
  },
];
