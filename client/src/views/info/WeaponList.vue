<template>
  <div id='info-page'>
    <h1 class='page-title'>Weapons</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load weapons
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
            <v-select v-model='filter_category' :items='filter_category_opts'
                      label='Weapon Category' menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_range' :items='filter_range_opts'
                      label='Range' menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_property' :items='filter_property_opts'
                      label='Property' menu-props='offsetY'></v-select>
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
            <td>{{ props.item.weapon_category  }}</td>
            <td>{{ props.item.weapon_range }}</td>
            <td>{{ damage(props.item) }}</td>
            <td>{{ properties(props.item.properties) }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <weapon-dialog v-model='shown_item' />

  </div>
</template>

<script>
import _ from 'lodash';
import WeaponDialog from '@/components/info/WeaponDialog.vue';

export default {
  name: 'weapon_list',
  components: {
    'weapon-dialog': WeaponDialog,
  },
  data() {
    return {
      error: false,
      filter_category: '',
      filter_name: '',
      filter_property: '',
      filter_range: '',
      filtered_items: null,
      items: null,
      shown_item: null,

      filter_category_opts: [
        { text: 'All', value: '' },
        { text: 'Simple', value: 'Simple' },
        { text: 'Martial', value: 'Martial' },
      ],
      filter_property_opts: [
        { text: 'All', value: '' },
        { text: 'Ammunition', value: 'Ammunition' },
        { text: 'Finesse', value: 'Finesse' },
        { text: 'Heavy', value: 'Heavy' },
        { text: 'Light', value: 'Light' },
        { text: 'Loading', value: 'Loading' },
        { text: 'Reach', value: 'Reach' },
        { text: 'Special', value: 'Special' },
        { text: 'Thrown', value: 'Thrown' },
        { text: 'Two-Handed', value: 'Two-Handed' },
        { text: 'Versatile', value: 'Versatile' },
      ],
      filter_range_opts: [
        { text: 'All', value: '' },
        { text: 'Melee', value: 'Melee' },
        { text: 'Ranged', value: 'Ranged' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Category', value: 'weapon_category', class: 'info-table-column-header' },
        { text: 'Range', value: 'weapon_range', class: 'info-table-column-header' },
        { text: 'Damage', value: 'damage.dice_value', class: 'info-table-column-header' },
        { text: 'Properties', value: 'properties[0].name', class: 'info-table-column-header' },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Weapon' })
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
    damage(weapon) {
      let dmg = '-';

      if (weapon.damage && weapon.damage.damage_type) {
        if (weapon.damage.dice_value === 0) {
          dmg = `${weapon.damage.dice_count} ${weapon.damage.damage_type.name}`;
        } else {
          dmg = `${weapon.damage.dice_count}d${weapon.damage.dice_value} ${weapon.damage.damage_type.name}`;
        }
      }

      if (weapon['2h_damage'] && weapon['2h_damage'].damage_type) {
        if (weapon['2h_damage'].dice_value === 0) {
          dmg += ` (${weapon['2h_damage'].dice_count} ${weapon['2h_damage'].damage_type.name})`;
        } else {
          dmg += ` (${weapon['2h_damage'].dice_count}d${weapon['2h_damage'].dice_value} ${weapon['2h_damage'].damage_type.name})`;
        }
      }

      return dmg;
    },

    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_category) {
        filtered = _.filter(filtered, { weapon_category: this.filter_category });
      }

      if (this.filter_property) {
        filtered = _.filter(filtered, (weapon) => {
          const props = _.map(weapon.properties, wp => wp.name);
          return props.includes(this.filter_property);
        });
      }

      if (this.filter_range) {
        filtered = _.filter(filtered, { weapon_range: this.filter_range });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },

    properties(props) {
      return _.join(_.map(props, prop => prop.name), ', ');
    },

    showItem(item) {
      this.shown_item = item;
    },
  },
  watch: {
    filter_category() {
      this.filter();
    },

    filter_property() {
      this.filter();
    },

    filter_range() {
      this.filter();
    },
  },
};
</script>
