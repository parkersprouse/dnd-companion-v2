export default [
  {
    path: '/characters',
    name: 'my-characters',
    component: () => import('../pages/characters/MyCharacters.vue'),
    meta: { authorized: true },
  },
  {
    path: '/characters/new',
    name: 'create-character',
    component: () => import('../pages/characters/CreateCharacter.vue'),
    meta: { authorized: true },
  },
  // {
  //   path: '/games/join',
  //   name: 'join-game',
  //   component: () => import('../pages/characters/JoinGame.vue'),
  //   meta: { authorized: true },
  // },
];
