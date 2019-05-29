export default [
  {
    path: '/characters',
    name: 'my_characters',
    component: () => import(/* webpackChunkName: "my_characters" */ '../pages/characters/MyCharacters.vue'),
    meta: { authorized: true },
  },
  {
    path: '/characters/new',
    name: 'create_character',
    component: () => import(/* webpackChunkName: "create_character" */ '../pages/characters/CreateCharacter.vue'),
    meta: { authorized: true },
  },
];
