<template>
  <div id='info-page'>
    <h1 class='page-title'>Armor</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load armor
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
            <v-select v-model='filter_category' :items='filter_category_opts' label='Armor Category'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_strength' :items='filter_strength_opts'
                      label='Minimum Strength' menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_stealth' :items='filter_stealth_opts'
                      label='Stealth Disadvantage' menu-props='offsetY'></v-select>
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
            <td>{{ props.item.armor_category }}</td>
            <td>{{ armorClass(props.item.armor_class) }}</td>
            <td>{{ props.item.str_minimum || '-' }}</td>
            <td>{{ props.item.stealth_disadvantage ? 'Disadvantage' : '-' }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <armor-dialog v-model='shown_item' />

  </div>
</template>

<script>
import _ from 'lodash';
import ArmorDialog from '@/components/info/ArmorDialog.vue';

export default {
  name: 'armor_list',
  components: {
    'armor-dialog': ArmorDialog,
  },
  data() {
    return {
      error: false,
      filter_category: '',
      filter_name: '',
      filter_stealth: '',
      filter_strength: '',
      filtered_items: null,
      items: null,
      shown_item: null,

      filter_category_opts: [
        { text: 'All', value: '' },
        { text: 'Light', value: 'Light' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Heavy', value: 'Heavy' },
        { text: 'Shield', value: 'Shield' },
      ],
      filter_stealth_opts: [
        { text: 'All', value: '' },
        { text: 'Yes', value: 'Yes' },
        { text: 'No', value: 'No' },
      ],
      filter_strength_opts: [
        { text: 'All', value: '' },
        { text: 'Yes', value: 'Yes' },
        { text: 'No', value: 'No' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Category', value: 'armor_category', class: 'info-table-column-header' },
        { text: 'Armor Class', value: 'armor_class.base', class: 'info-table-column-header' },
        { text: 'Min. Strength', value: 'str_minimum', class: 'info-table-column-header' },
        { text: 'Stealth', value: 'stealth_disadvantage', class: 'info-table-column-header' },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Armor' })
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
    armorClass(obj) {
      const dex_modifier = obj.dex_bonus ? ' + dex. modifier' : '';
      const max_bonus = obj.max_bonus ? ` (max ${obj.max_bonus})` : '';
      return `${obj.base} ${dex_modifier} ${max_bonus}`;
    },

    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_category) {
        filtered = _.filter(filtered, { armor_category: this.filter_category });
      }

      if (this.filter_stealth) {
        filtered = _.filter(filtered, (armor) => {
          if (this.filter_stealth === 'Yes') return armor.stealth_disadvantage;
          return !armor.stealth_disadvantage;
        });
      }

      if (this.filter_strength) {
        filtered = _.filter(filtered, (armor) => {
          if (this.filter_strength === 'Yes') return armor.str_minimum > 0;
          return armor.str_minimum === 0;
        });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },

    showItem(item) {
      this.shown_item = item;
    },
  },
  watch: {
    filter_category() {
      this.filter();
    },

    filter_stealth() {
      this.filter();
    },

    filter_strength() {
      this.filter();
    },
  },
};
</script>
