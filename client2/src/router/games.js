export default [
  {
    path: '/games',
    name: 'my_games',
    component: () => import(/* webpackChunkName: "my_games" */ '../views/games/MyGames.vue'),
    meta: { authorized: true },
  },
  {
    path: '/games/new',
    name: 'create_game',
    component: () => import(/* webpackChunkName: "create_game" */ '../views/games/CreateGame.vue'),
    meta: { authorized: true },
  },
  {
    path: '/games/join',
    name: 'join_game',
    component: () => import(/* webpackChunkName: "join_game" */ '../views/games/JoinGame.vue'),
    meta: { authorized: true },
  },
];
