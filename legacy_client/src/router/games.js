export default [
  {
    path: '/games',
    name: 'my-games',
    component: () => import('../pages/games/MyGames.vue'),
    meta: { authorized: true },
  },
  {
    path: '/games/new',
    name: 'create-game',
    component: () => import('../pages/games/CreateGame.vue'),
    meta: { authorized: true },
  },
  {
    path: '/games/join',
    name: 'join-game',
    component: () => import('../pages/games/JoinGame.vue'),
    meta: { authorized: true },
  },
];
