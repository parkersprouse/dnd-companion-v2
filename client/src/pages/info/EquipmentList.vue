<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> There was a problem retrieving the info
      </uiv-alert>
    </div>
    <div v-else class='container'>
      <div class='page-header'>
        <h1>Equipment</h1>
      </div>

      <div class='row'>
        <div class='col-xs-12 col-md-6'>
          <div class='form-group'>
            <div class='input-group'>
              <span class='input-group-addon'>
                <span class='glyphicon glyphicon-search' aria-hidden='true'></span>
              </span>
              <input type='text' class='form-control' id='name_filter' name='name_filter' placeholder='Filter' v-model.trim='name_filter' />
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-md-6'>
          <div class='row'>
            <div class='col-xs-6'>
              <div class='form-group'>
                <select class='form-control' id='category_filter' v-model='category_filter'>
                  <option value=''>All</option>
                  <option>Adventuring Gear</option>
                  <option>Mounts and Vehicles</option>
                  <option>Tools</option>
                </select>
                <p class='help-block'>Category</p>
              </div>
            </div>
            <div class='col-xs-6'>
              <div class='form-group'>
                <select class='form-control' id='subcategory_filter' v-model='subcategory_filter'>
                  <option value=''>All</option>
                  <option>Ammunition</option>
                  <option>Arcane focus</option>
                  <option>Artisan's Tools</option>
                  <option>Druidic focus</option>
                  <option>Equipment Pack</option>
                  <option>Gaming Sets</option>
                  <option>Holy Symbol</option>
                  <option>Kit</option>
                  <option>Mounts and Other Animals</option>
                  <option>Musical Instrument</option>
                  <option>Other Tools</option>
                  <option>Standard Gear</option>
                  <option>Tack, Harness, and Drawn Vehicles</option>
                  <option>Waterborne Vehicles</option>
                </select>
                <p class='help-block'>Subcategory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='table-responsive'>
        <table class='table table-hover table-striped table-bordered info-table'>
          <thead>
            <tr>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('equipment_category')">Category</th>
              <th @click="sortBy('subcategory')">Subcategory</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in filtered_equipment' :key='item.id' @click='selected_equipment = item'>
              <td>{{ item.name }}</td>
              <td>{{ item.equipment_category  }}</td>
              <td>{{ item.gear_category || item.vehicle_category || item.tool_category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <uiv-modal v-model='show_modal' :title="show_modal ? selected_equipment.name : ''" @hide='selected_equipment = null' ref='modal' id='equipment-modal'>
      <equipment-details :equipment='selected_equipment' />
      <div slot='footer'>
        <uiv-btn @click='show_modal = false'>Close</uiv-btn>
      </div>
    </uiv-modal>

  </div>
</template>

<script>
import _ from 'lodash';
import EquipmentDetails from '../../components/info/EquipmentDetails.vue';

export default {
  name: 'equipment_list',
  components: {
    'equipment-details': EquipmentDetails,
  },
  data() {
    return {
      current_sorted_property: 'name',
      equipment: null,
      error: false,
      filtered_equipment: null,
      selected_equipment: null,
      show_modal: false,

      category_filter: '',
      name_filter: '',
      subcategory_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/equipment')
      .then((response) => {
        // Can't do an 'or' through the endpoint, so we'll just filter it client-side
        let equipment = _.filter(response.data.content, item => item.equipment_category === 'Adventuring Gear' || item.equipment_category === 'Mounts and Vehicles' || item.equipment_category === 'Tools');
        equipment = _.sortBy(equipment, ['name']);
        this.equipment = equipment;
        this.filtered_equipment = equipment;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.equipment);

      if (this.name_filter) {
        filtered = _.filter(filtered, equipment => equipment.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      if (this.category_filter) {
        filtered = _.filter(filtered, { equipment_category: this.category_filter });
      }

      if (this.subcategory_filter) {
        filtered = _.filter(filtered, equipment => equipment.gear_category === this.subcategory_filter || equipment.vehicle_category === this.subcategory_filter || equipment.tool_category === this.subcategory_filter);
      }

      this.filtered_equipment = _.cloneDeep(filtered);
      this.current_sorted_property = '';
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_equipment);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        if (property === 'subcategory') {
          sorted = _.sortBy(sorted, ['gear_category', 'vehicle_category', 'tool_category']);
        }
        else {
          sorted = _.sortBy(sorted, [property]);
        }
        this.current_sorted_property = property;
      }

      this.filtered_equipment = _.cloneDeep(sorted);
    },
  },
  watch: {
    selected_equipment(new_value) {
      this.show_modal = !!new_value;
    },
    category_filter() {
      this.filter();
    },
    subcategory_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
  },
};
</script>
