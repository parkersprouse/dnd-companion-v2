<template>
  <div id='info-page'>
    <h1 style='margin-bottom: 1rem;'>Spells</h1>

    <!-- Table Loading Indicator -->
    <div v-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <v-alert v-else-if='error' :value='true' type='error'>
      Failed to load spells
    </v-alert>

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
            <v-select v-model='filter_level' :items='filter_level_opts' label='Level'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_class' :items='filter_class_opts'
                      label='Class' menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_school' :items='filter_school_opts'
                      label='School' menu-props='offsetY'></v-select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <v-data-table v-if='filtered_items' class='elevation-1' :headers='headers' hide-actions
                   :items='filtered_items' must-sort :search='filter_name'
                    sort-icon='fa-arrow-up ml-2'>
        <template v-slot:items='props'>
          <tr class='info-table-row' @click.stop='showItem(props.item)'>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.level || 'Cantrip' }}</td>
            <td>{{ props.item.range }}</td>
            <td>{{ classes(props.item) }}</td>
            <td>{{ props.item.school.name }}</td>
            <td>{{ props.item.casting_time }}</td>
            <td>{{ props.item.duration }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <spell-dialog v-model='shown_item' />

  </div>
</template>

<script>
import _ from 'lodash';
import SpellDialog from '@/components/info/SpellDialog.vue';

export default {
  name: 'spells_list',
  components: {
    'spell-dialog': SpellDialog,
  },
  data() {
    return {
      error: false,
      filter_level: '',
      filter_name: '',
      filter_class: '',
      filter_school: '',
      filtered_items: null,
      items: null,
      shown_item: null,

      filter_class_opts: [
        { text: 'All', value: '' },
        { text: 'Bard', value: 'Bard' },
        { text: 'Cleric', value: 'Cleric' },
        { text: 'Druid', value: 'Druid' },
        { text: 'Paladin', value: 'Paladin' },
        { text: 'Ranger', value: 'Ranger' },
        { text: 'Sorcerer', value: 'Sorcerer' },
        { text: 'Warlock', value: 'Warlock' },
        { text: 'Wizard', value: 'Wizard' },
      ],
      filter_level_opts: [
        { text: 'All', value: '' },
        { text: 'Cantrips', value: '0' },
        { text: 'Level 1', value: '1' },
        { text: 'Level 2', value: '2' },
        { text: 'Level 3', value: '3' },
        { text: 'Level 4', value: '4' },
        { text: 'Level 5', value: '5' },
        { text: 'Level 6', value: '6' },
        { text: 'Level 7', value: '7' },
        { text: 'Level 8', value: '8' },
        { text: 'Level 9', value: '9' },
      ],
      filter_school_opts: [
        { text: 'All', value: '' },
        { text: 'Abjuration', value: 'Abjuration' },
        { text: 'Conjuration', value: 'Conjuration' },
        { text: 'Divination', value: 'Divination' },
        { text: 'Enchantment', value: 'Enchantment' },
        { text: 'Evocation', value: 'Evocation' },
        { text: 'Illusion', value: 'Illusion' },
        { text: 'Necromancy', value: 'Necromancy' },
        { text: 'Transmutation', value: 'Transmutation' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Level', value: 'level', class: 'info-table-column-header' },
        { text: 'Range', value: 'range', class: 'info-table-column-header' },
        { text: 'Classes', value: 'classes[0].name', class: 'info-table-column-header' },
        { text: 'School', value: 'school.name', class: 'info-table-column-header' },
        { text: 'Casting Time', value: 'casting_time', class: 'info-table-column-header' },
        { text: 'Duration', value: 'duration', class: 'info-table-column-header' },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/spells')
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
    classes(spell) {
      return _.join(_.map(spell.classes, c => c.name), ', ');
    },

    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_level) {
        filtered = _.filter(filtered, { level: Number(this.filter_level) });
      }

      if (this.filter_class) {
        filtered = _.filter(filtered, (spell) => {
          const classes = _.map(spell.classes, c => c.name);
          return classes.includes(this.filter_class);
        });
      }

      if (this.filter_school) {
        filtered = _.filter(filtered, { school: { name: this.filter_school } });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },

    showItem(item) {
      this.shown_item = item;
    },
  },
  watch: {
    filter_level() {
      this.filter();
    },

    filter_class() {
      this.filter();
    },

    filter_school() {
      this.filter();
    },
  },
};
</script>
