<template>
  <div id='info-page'>
    <h1 class='page-title'>Proficiencies</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load proficiencies
    </v-alert>

    <!-- Table Loading Indicator -->
    <div v-else-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <!-- Table Display -->
    <div v-else>
      <!-- Filter Controls -->
      <div id='filter-controls'>
        <div>
          <v-text-field v-model='filter_name' clearable label='Filter'
                        prepend-inner-icon='fa-search'></v-text-field>
        </div>
        <div class='onethird'>
          <div>
            <v-select v-model='filter_type' :items='filter_type_opts' label='Type'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_race' :items='filter_race_opts' label='Race'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_class' :items='filter_class_opts' label='Class'
                      menu-props='offsetY'></v-select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <v-data-table v-if='filtered_items' class='elevation-1' :headers='headers' hide-actions
                   :items='filtered_items' must-sort :search='filter_name'
                    sort-icon='fa-arrow-up ml-2'>
        <template v-slot:items='props'>
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ races(props.item) }}</td>
            <td>{{ classes(props.item) }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'proficiencies_list',
  data() {
    return {
      error: false,
      filter_class: '',
      filter_name: '',
      filter_race: '',
      filter_type: '',
      filtered_items: null,
      items: null,

      filter_class_opts: [
        { text: 'All', value: '' },
        { text: 'Barbarian', value: 'Barbarian' },
        { text: 'Bard', value: 'Bard' },
        { text: 'Cleric', value: 'Cleric' },
        { text: 'Druid', value: 'Druid' },
        { text: 'Fighter', value: 'Fighter' },
        { text: 'Monk', value: 'Monk' },
        { text: 'Paladin', value: 'Paladin' },
        { text: 'Ranger', value: 'Ranger' },
        { text: 'Rogue', value: 'Rogue' },
        { text: 'Sorcerer', value: 'Sorcerer' },
        { text: 'Warlock', value: 'Warlock' },
        { text: 'Wizard', value: 'Wizard' },
      ],
      filter_race_opts: [
        { text: 'All', value: '' },
        { text: 'Dragonborn', value: 'Dragonborn' },
        { text: 'Dwarf', value: 'Dwarf' },
        { text: 'Elf', value: 'Elf' },
        { text: 'Gnome', value: 'Gnome' },
        { text: 'Half-Elf', value: 'Half-Elf' },
        { text: 'Half-Orc', value: 'Half-Orc' },
        { text: 'Halfling', value: 'Halfling' },
        { text: 'Human', value: 'Human' },
        { text: 'Tiefling', value: 'Tiefling' },
      ],
      filter_type_opts: [
        { text: 'All', value: '' },
        { text: 'Armor', value: 'Armor' },
        { text: "Artisan's Tools", value: "Artisan's Tools" },
        { text: 'Gaming Sets', value: 'Gaming Sets' },
        { text: 'Musical Instruments', value: 'Musical Instruments' },
        { text: 'Other', value: 'Other' },
        { text: 'Saving Throws', value: 'Saving Throws' },
        { text: 'Skills', value: 'Skills' },
        { text: 'Vehicles', value: 'Vehicles' },
        { text: 'Weapons', value: 'Weapons' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Type', value: 'type', class: 'info-table-column-header' },
        { text: 'Races', value: 'races[0].name', class: 'info-table-column-header' },
        { text: 'Classes', value: 'classes[0].name', class: 'info-table-column-header' },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/proficiencies')
      .then((response) => {
        const items = _.sortBy(response.data.content, ['name']);
        this.items = items;
        this.filtered_items = items;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    classes(item) {
      return _.join(_.map(item.classes, c => c.name), ', ');
    },

    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_class) {
        filtered = _.filter(filtered, (proficiency) => {
          const classes = _.map(proficiency.classes, c => c.name);
          return classes.includes(this.filter_class);
        });
      }

      if (this.filter_race) {
        filtered = _.filter(filtered, (proficiency) => {
          const races = _.map(proficiency.races, r => r.name);
          return races.includes(this.filter_race);
        });
      }

      if (this.filter_type) {
        filtered = _.filter(filtered, { type: this.filter_type });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },

    races(item) {
      return _.join(_.map(item.races, r => r.name), ', ');
    },
  },
  watch: {
    filter_class() {
      this.filter();
    },

    filter_race() {
      this.filter();
    },

    filter_type() {
      this.filter();
    },
  },
};
</script>
