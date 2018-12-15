const { db, Sequelize } = require('../config/db');
const User = require('./user');

const attributes = {
  ability_scores:    { type: Sequelize.JSON }, // { 'charisma': { level: 13, modifier: 1 } }
  age:               { type: Sequelize.TEXT },
  alignment:         { type: Sequelize.TEXT },
  allies:            { type: Sequelize.TEXT }, // 'Allies & Organizations'
  armor:             { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of armor objects -- [{ name: 'Breastplate', amount: 1, equipped: false, desc: '', custom: false }]
  armor_class:       { type: Sequelize.TEXT },
  attunements:       { type: Sequelize.JSON }, // { amount: 1, items: ['Item'] }
  background:        { type: Sequelize.TEXT },
  backstory:         { type: Sequelize.TEXT }, // 'Character Backstory'
  bonds:             { type: Sequelize.TEXT }, // 'Bonds'
  class:             { type: Sequelize.TEXT }, // class name -- allows for custom
  copper:            { type: Sequelize.TEXT },
  current_hp:        { type: Sequelize.TEXT },
  death_saves:       { type: Sequelize.JSON }, // { success: 0, failed: 2 }
  electrum:          { type: Sequelize.TEXT },
  equipment:         { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of equipment objects -- [{ name: 'Lantern', amount: 1, desc: '', custom: false }]
  experience:        { type: Sequelize.TEXT, defaultValue: '0' },
  eye_color:         { type: Sequelize.TEXT },
  features:          { type: Sequelize.ARRAY(Sequelize.JSON) }, // [{ name: 'Rage', desc: '...', total_uses: 3, spent_uses: 1 }]
  flaws:             { type: Sequelize.TEXT }, // 'Flaws'
  gold:              { type: Sequelize.TEXT },
  hair_color:        { type: Sequelize.TEXT },
  height:            { type: Sequelize.TEXT },
  hit_dice:          { type: Sequelize.TEXT },
  id:                { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  ideals:            { type: Sequelize.TEXT }, // 'Ideals'
  initiative:        { type: Sequelize.TEXT },
  inspiration:       { type: Sequelize.TEXT },
  languages:         { type: Sequelize.ARRAY(Sequelize.TEXT) }, // array of language names -- allows for custom
  level:             { type: Sequelize.TEXT, defaultValue: '1' },
  max_hp:            { type: Sequelize.TEXT },
  more_features:     { type: Sequelize.TEXT }, // Additional Features & Traits
  name:              { type: Sequelize.TEXT, allowNull: false },
  notes:             { type: Sequelize.TEXT }, // 'Character Notes'
  passive_wisdom:    { type: Sequelize.TEXT }, // passive perception
  personality:       { type: Sequelize.TEXT }, // 'Personality Traits'
  platinum:          { type: Sequelize.TEXT },
  proficiencies:     { type: Sequelize.ARRAY(Sequelize.JSON) }, // [{ name: 'Slight of Hand', double: true, skill: true }, { name: 'Light Armor' }]
  proficiency_bonus: { type: Sequelize.TEXT },
  race:              { type: Sequelize.TEXT }, // race name -- allows for custom
  silver:            { type: Sequelize.TEXT },
  skin_color:        { type: Sequelize.TEXT },
  speed:             { type: Sequelize.TEXT },
  spell_ability:     { type: Sequelize.TEXT }, // 'Spellcasting Ability'
  spell_atk_bonus:   { type: Sequelize.TEXT },
  spell_class:       { type: Sequelize.TEXT }, // 'Spellcasting Class'
  spell_save_dc:     { type: Sequelize.TEXT },
  spells:            { type: Sequelize.ARRAY(Sequelize.JSON) }, // [{ level: 1, spells: [{ id: 3, prepared: true }], slots: 3, slots_used: 1 }]
  subrace:           { type: Sequelize.TEXT },
  temp_hp:           { type: Sequelize.TEXT },
  treasure:          { type: Sequelize.TEXT }, // 'Treasure'
  weapons:           { type: Sequelize.ARRAY(Sequelize.JSON) }, // array of weapon objects -- [{ name: 'Sword', amount: 1, equipped: false, desc: '', custom: false }]
  weight:            { type: Sequelize.TEXT },
  owner_id:          {
                       type: Sequelize.INTEGER, allowNull: false,
                       references: {
                         model: User,
                         key: 'id',
                         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                       }
                     }
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const Character = db.define('characters', attributes, table_config);

// Character.afterDestroy((char) => {
//   const Game = require('./game');
//   const { call } = require('../lib');

//   const [err, data] = await call(Game.findOne({ where: { char_ids: { $contains: [Number(char.id)] } } }));
//   if (!data)
//     return; // No games with this char, so don't worry about it
//   if (err)
//     throw new Error("Failed to get character's games");

//   const { char_ids } = data;
//   char_ids.splice(char_ids.indexOf(Number(req.params.id)), 1);
// });

module.exports = Character;
