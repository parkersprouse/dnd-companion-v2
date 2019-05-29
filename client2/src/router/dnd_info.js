export default [
  {
    path: '/info/armor',
    name: 'armor_list',
    component: () => import(/* webpackChunkName: "armor_list" */ '../pages/info/ArmorList.vue'),
  },
  {
    path: '/info/classes',
    name: 'class_list',
    component: () => import(/* webpackChunkName: "class_list" */ '../pages/info/ClassList.vue'),
  },
  {
    path: '/info/classes/:classname',
    name: 'class_info',
    component: () => import(/* webpackChunkName: "class_info" */ '../pages/info/ClassInfo.vue'),
  },
  {
    path: '/info/conditions',
    name: 'condition_list',
    component: () => import(/* webpackChunkName: "condition_list" */ '../pages/info/ConditionsList.vue'),
  },
  {
    path: '/info/damage_types',
    name: 'damage_types_list',
    component: () => import(/* webpackChunkName: "damage_types_list" */ '../pages/info/DamageTypesList.vue'),
  },
  {
    path: '/info/equipment',
    name: 'equipment_list',
    component: () => import(/* webpackChunkName: "equipment_list" */ '../pages/info/EquipmentList.vue'),
  },
  {
    path: '/info/languages',
    name: 'language_list',
    component: () => import(/* webpackChunkName: "language_list" */ '../pages/info/LanguagesList.vue'),
  },
  {
    path: '/info/proficiencies',
    name: 'proficiencies_list',
    component: () => import(/* webpackChunkName: "proficiencies_list" */ '../pages/info/ProficienciesList.vue'),
  },
  {
    path: '/info/races',
    name: 'races_list',
    component: () => import(/* webpackChunkName: "races_list" */ '../pages/info/RaceList.vue'),
  },
  {
    path: '/info/races/:racename',
    name: '/race_info',
    component: () => import(/* webpackChunkName: "race_info" */ '../pages/info/RaceInfo.vue'),
  },
  {
    path: '/info/skills',
    name: 'skills_list',
    component: () => import(/* webpackChunkName: "skills_list" */ '../pages/info/SkillsList.vue'),
  },
  {
    path: '/info/spells',
    name: 'spell_list',
    component: () => import(/* webpackChunkName: "spell_list" */ '../pages/info/SpellsList.vue'),
  },
  {
    path: '/info/trinkets',
    name: 'trinket_list',
    component: () => import(/* webpackChunkName: "trinket_list" */ '../pages/info/TrinketsList.vue'),
  },
  {
    path: '/info/weapon_properties',
    name: 'weapon_properties_list',
    component: () => import(/* webpackChunkName: "weapon_properties_list" */ '../pages/info/WeaponPropertiesList.vue'),
  },
  {
    path: '/info/weapons',
    name: 'weapons_list',
    component: () => import(/* webpackChunkName: "weapons_list" */ '../pages/info/WeaponsList.vue'),
  },
];
