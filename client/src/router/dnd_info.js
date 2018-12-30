export default [
  {
    path: '/info/armor',
    name: 'armor_list',
    component: () => import('../pages/info/ArmorList.vue'),
  },
  {
    path: '/info/equipment',
    name: 'equipment_list',
    component: () => import('../pages/info/EquipmentList.vue'),
  },
  {
    path: '/info/spells',
    name: 'spell_list',
    component: () => import('../pages/info/SpellsList.vue'),
  },
  {
    path: '/info/trinkets',
    name: 'trinket_list',
    component: () => import('../pages/info/TrinketsList.vue'),
  },
  {
    path: '/info/weapons',
    name: 'weapons_list',
    component: () => import('../pages/info/WeaponsList.vue'),
  },
];
