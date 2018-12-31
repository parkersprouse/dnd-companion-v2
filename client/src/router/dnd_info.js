export default [
  {
    path: '/info/armor',
    name: 'armor_list',
    component: () => import('../pages/info/ArmorList.vue'),
  },
  {
    path: '/info/conditions',
    name: 'condition_list',
    component: () => import('../pages/info/ConditionsList.vue'),
  },
  {
    path: '/info/damage_types',
    name: 'damage_types_list',
    component: () => import('../pages/info/DamageTypesList.vue'),
  },
  {
    path: '/info/equipment',
    name: 'equipment_list',
    component: () => import('../pages/info/EquipmentList.vue'),
  },
  {
    path: '/info/languages',
    name: 'language_list',
    component: () => import('../pages/info/LanguagesList.vue'),
  },
  {
    path: '/info/proficiencies',
    name: 'proficiencies_list',
    component: () => import('../pages/info/ProficienciesList.vue'),
  },
  {
    path: '/info/skills',
    name: 'skills_list',
    component: () => import('../pages/info/SkillsList.vue'),
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
    path: '/info/weapon_properties',
    name: 'weapon_properties_list',
    component: () => import('../pages/info/WeaponPropertiesList.vue'),
  },
  {
    path: '/info/weapons',
    name: 'weapons_list',
    component: () => import('../pages/info/WeaponsList.vue'),
  },
];
