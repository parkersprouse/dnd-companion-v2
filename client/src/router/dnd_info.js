export default [
  {
    path: '/info/armor',
    name: 'armor_list',
    component: () => import(/* webpackChunkName: "armor_list" */ '../views/info/ArmorList.vue'),
  },
  // {
  //   path: '/info/classes',
  //   name: 'class_list',
  //   component: () => import(/* webpackChunkName: "class_list" */ '../views/info/ClassList.vue'),
  // },
  // {
  //   path: '/info/classes/:classname',
  //   name: 'class_info',
  //   component: () => import(/* webpackChunkName: "class_info" */ '../views/info/ClassInfo.vue'),
  // },
  {
    path: '/info/conditions',
    name: 'condition_list',
    component: () => import(/* webpackChunkName: "condition_list" */ '../views/info/ConditionsList.vue'),
  },
  {
    path: '/info/damage_types',
    name: 'damage_types_list',
    component: () => import(/* webpackChunkName: "damage_types_list" */ '../views/info/DamageTypesList.vue'),
  },
  {
    path: '/info/equipment',
    name: 'equipment_list',
    component: () => import(/* webpackChunkName: "equipment_list" */ '../views/info/EquipmentList.vue'),
  },
  {
    path: '/info/languages',
    name: 'language_list',
    component: () => import(/* webpackChunkName: "language_list" */ '../views/info/LanguagesList.vue'),
  },
  {
    path: '/info/proficiencies',
    name: 'proficiencies_list',
    component: () => import(/* webpackChunkName: "proficiencies_list" */ '../views/info/ProficienciesList.vue'),
  },
  // {
  //   path: '/info/races',
  //   name: 'races_list',
  //   component: () => import(/* webpackChunkName: "races_list" */ '../views/info/RaceList.vue'),
  // },
  // {
  //   path: '/info/races/:racename',
  //   name: 'race_info',
  //   component: () => import(/* webpackChunkName: "race_info" */ '../views/info/RaceInfo.vue'),
  // },
  {
    path: '/info/skills',
    name: 'skills_list',
    component: () => import(/* webpackChunkName: "skills_list" */ '../views/info/SkillsList.vue'),
  },
  {
    path: '/info/spells',
    name: 'spell_list',
    component: () => import(/* webpackChunkName: "spell_list" */ '../views/info/SpellsList.vue'),
  },
  {
    path: '/info/trinkets',
    name: 'trinket_list',
    component: () => import(/* webpackChunkName: "trinket_list" */ '../views/info/TrinketsList.vue'),
  },
  {
    path: '/info/weapon_properties',
    name: 'weapon_properties_list',
    component: () => import(/* webpackChunkName: "weapon_properties_list" */ '../views/info/WeaponPropertiesList.vue'),
  },
  {
    path: '/info/weapons',
    name: 'weapon_list',
    component: () => import(/* webpackChunkName: "weapon_list" */ '../views/info/WeaponList.vue'),
  },
];
