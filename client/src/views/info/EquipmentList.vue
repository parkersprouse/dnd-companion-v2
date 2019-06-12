<template>
  <div id='info-page'>
    <h1 class='page-title'>Equipment</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load equipment
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
        <div class='onehalf'>
          <div>
            <v-select v-model='filter_category' :items='filter_category_opts' label='Category'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_subcategory' :items='filter_subcategory_opts'
                      label='Subcategory' menu-props='offsetY'></v-select>
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
            <td>{{ props.item.equipment_category }}</td>
            <td>
              {{
                props.item.gear_category || props.item.vehicle_category || props.item.tool_category
              }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>

    <equipment-dialog v-model='shown_item' />

  </div>
</template>

<script>
import _ from 'lodash';
import EquipmentDialog from '@/components/info/EquipmentDialog.vue';

export default {
  name: 'equipment_list',
  components: {
    'equipment-dialog': EquipmentDialog,
  },
  data() {
    return {
      error: false,
      filter_name: '',
      filter_subcategory: '',
      filter_category: '',
      filtered_items: null,
      items: null,
      shown_item: null,

      filter_category_opts: [
        { text: 'All', value: '' },
        { text: 'Adventuring Gear', value: 'Adventuring Gear' },
        { text: 'Mounts and Vehicles', value: 'Mounts and Vehicles' },
        { text: 'Tools', value: 'Tools' },
      ],
      filter_subcategory_opts: [
        { text: 'All', value: '' },
        { text: 'Ammunition', value: 'Ammunition' },
        { text: 'Arcane focus', value: 'Arcane focus' },
        { text: "Artisan's Tools", value: "Artisan's Tools" },
        { text: 'Druidic focus', value: 'Druidic focus' },
        { text: 'Equipment Pack', value: 'Equipment Pack' },
        { text: 'Gaming Sets', value: 'Gaming Sets' },
        { text: 'Holy Symbol', value: 'Holy Symbol' },
        { text: 'Kit', value: 'Kit' },
        { text: 'Mounts and Other Animals', value: 'Mounts and Other Animals' },
        { text: 'Musical Instrument', value: 'Musical Instrument' },
        { text: 'Other Tools', value: 'Other Tools' },
        { text: 'Standard Gear', value: 'Standard Gear' },
        { text: 'Tack, Harness, and Drawn Vehicles', value: 'Tack, Harness, and Drawn Vehicles' },
        { text: 'Waterborne Vehicles', value: 'Waterborne Vehicles' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Category', value: 'equipment_category', class: 'info-table-column-header' },
        {
          text: 'Subcategory',
          value: 'subcategory',
          sortable: false,
          class: 'info-table-column-header',
        },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment')
      .then((response) => {
        // Can't do an 'or' through the endpoint, so we'll just filter it client-side
        const items = _.filter(response.data.content, (item) => {
          const adventure = item.equipment_category === 'Adventuring Gear';
          const mounts = item.equipment_category === 'Mounts and Vehicles';
          const tools = item.equipment_category === 'Tools';
          return adventure || mounts || tools;
        });
        this.items = items;
        this.filtered_items = items;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_category) {
        filtered = _.filter(filtered, { equipment_category: this.filter_category });
      }

      if (this.filter_subcategory) {
        filtered = _.filter(filtered, (equipment) => {
          const is_gear = equipment.gear_category === this.filter_subcategory;
          const is_vehicle = equipment.vehicle_category === this.filter_subcategory;
          const is_tool = equipment.tool_category === this.filter_subcategory;
          return is_gear || is_vehicle || is_tool;
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

    filter_subcategory() {
      this.filter();
    },
  },
};
</script>
