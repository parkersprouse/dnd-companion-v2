const { db, Sequelize } = require('../config/db');
const User = require('./user');

const attributes = {
  ability_scores: {
    // { 'charisma': { level: 13, modifier: 1 } }
    type: Sequelize.JSON,
  },
  age: {
    type: Sequelize.TEXT,
  },
  alignment: {
    type: Sequelize.TEXT,
  },
  allies: {
    // 'Allies & Organizations'
    type: Sequelize.TEXT,
  },
  armor: {
    // array of armor objects
    // [{ name: 'Breastplate', amount: 1, equipped: false, desc: '', custom: false }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  armor_class: {
    type: Sequelize.TEXT,
  },
  attunements: {
    // { amount: 1, items: ['Item'] }
    type: Sequelize.JSON,
  },
  background: {
    type: Sequelize.TEXT,
  },
  backstory: {
    // 'Character Backstory'
    type: Sequelize.TEXT,
  },
  bonds: {
    // 'Bonds'
    type: Sequelize.TEXT,
  },
  class: {
    // class name -- allows for custom
    type: Sequelize.TEXT,
  },
  copper: {
    type: Sequelize.TEXT,
  },
  current_hp: {
    type: Sequelize.TEXT,
  },
  death_saves: {
    // { success: 0, failed: 0 }
    type: Sequelize.JSON,
  },
  electrum: {
    type: Sequelize.TEXT,
  },
  equipment: {
    // array of equipment objects
    // [{ name: 'Lantern', amount: 1, desc: '', custom: false }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  experience: {
    defaultValue: '0',
    type: Sequelize.TEXT,
  },
  eye_color: {
    type: Sequelize.TEXT,
  },
  features: {
    // [{ name: 'Rage', desc: '...', total_uses: 3, spent_uses: 1, custom: false }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  flaws: {
    // 'Flaws'
    type: Sequelize.TEXT,
  },
  gold: {
    type: Sequelize.TEXT,
  },
  hair_color: {
    type: Sequelize.TEXT,
  },
  height: {
    type: Sequelize.TEXT,
  },
  hit_dice: {
    type: Sequelize.TEXT,
  },
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true,
  },
  ideals: {
    // 'Ideals'
    type: Sequelize.TEXT,
  },
  initiative: {
    type: Sequelize.TEXT,
  },
  inspiration: {
    type: Sequelize.TEXT,
  },
  languages: {
    // array of language names -- allows for custom
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  level: {
    defaultValue: '1',
    type: Sequelize.TEXT,
  },
  max_hp: {
    type: Sequelize.TEXT,
  },
  more_features: {
    // Additional Features & Traits
    type: Sequelize.TEXT,
  },
  name: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  notes: {
    // 'Character Notes'
    type: Sequelize.TEXT,
  },
  passive_wisdom: {
    // passive perception
    type: Sequelize.TEXT,
  },
  personality: {
    // 'Personality Traits'
    type: Sequelize.TEXT,
  },
  platinum: {
    type: Sequelize.TEXT,
  },
  proficiencies: {
    // [{ name: 'Slight of Hand', double: true, skill: true }, { name: 'Light Armor' }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  proficiency_bonus: {
    type: Sequelize.TEXT,
  },
  race: {
    // race name -- allows for custom
    type: Sequelize.TEXT,
  },
  silver: {
    type: Sequelize.TEXT,
  },
  skin_color: {
    type: Sequelize.TEXT,
  },
  speed: {
    type: Sequelize.TEXT,
  },
  spell_ability: {
    // 'Spellcasting Ability'
    type: Sequelize.TEXT,
  },
  spell_atk_bonus: {
    type: Sequelize.TEXT,
  },
  spell_class: {
    // 'Spellcasting Class'
    type: Sequelize.TEXT,
  },
  spell_save_dc: {
    type: Sequelize.TEXT,
  },
  spells: {
    // [{ level: 1, spells: [{ id: 3, prepared: true }], slots: 3, slots_used: 1 }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  subrace: {
    type: Sequelize.TEXT,
  },
  temp_hp: {
    type: Sequelize.TEXT,
  },
  treasure: {
    // 'Treasure'
    type: Sequelize.TEXT,
  },
  weapons: {
    // array of weapon objects
    // [{ name: 'Sword', amount: 1, equipped: false, desc: '', custom: false }]
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
  weight: {
    type: Sequelize.TEXT,
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

const Character = db.define('characters', attributes, table_config);
Character.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'user_id' }, // the user who created the character
  hooks: true,
  onDelete: 'cascade',
});

module.exports = Character;
