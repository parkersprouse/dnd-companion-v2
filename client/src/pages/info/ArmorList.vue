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
        <h1>Armor List</h1>
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
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='category_filter' v-model='category_filter'>
                  <option value=''>All</option>
                  <option>Light</option>
                  <option>Medium</option>
                  <option>Heavy</option>
                  <option>Shield</option>
                </select>
                <p class='help-block'>Category</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='min_str_filter' v-model='min_str_filter'>
                  <option value=''>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <p class='help-block'>Minimum Strength</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='stealth_filter' v-model='stealth_filter'>
                  <option value=''>All</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                <p class='help-block'>Stealth Disadvantage</p>
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
              <th @click="sortBy('armor_category')">Category</th>
              <th @click="sortBy('armor_class.base')">Armor Class</th>
              <th @click="sortBy('str_minimum')">Min. Strength</th>
              <th @click="sortBy('stealth_disadvantage')">Stealth</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in filtered_armor' :key='item.id' @click='selected_armor = item'>
              <td>{{ item.name }}</td>
              <td>{{ item.armor_category  }}</td>
              <td>{{ `${item.armor_class.base} ${item.armor_class.dex_bonus ? ' + dex. modifier' : ''} ${item.armor_class.max_bonus ? ` (max ${item.armor_class.max_bonus})` : ''}` }}</td>
              <td>{{ item.str_minimum || '-' }}</td>
              <td>{{ item.stealth_disadvantage ? 'Disadvantage' : '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <uiv-modal v-model='show_modal' :title="show_modal ? selected_armor.name : ''" @hide='selected_armor = null' ref='modal' id='armor-modal'>
      <armor-details :armor='selected_armor' />
      <div slot='footer'>
        <uiv-btn @click='show_modal = false'>Close</uiv-btn>
      </div>
    </uiv-modal>

  </div>
</template>

<script>
import _ from 'lodash';
import ArmorDetails from '../../components/modals/ArmorDetails.vue';

export default {
  name: 'armor_list',
  components: {
    'armor-details': ArmorDetails,
  },
  data() {
    return {
      armor: null,
      current_sorted_property: '',
      error: false,
      filtered_armor: null,
      selected_armor: null,
      show_modal: false,

      category_filter: '',
      min_str_filter: '',
      name_filter: '',
      stealth_filter: '',
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Armor' })
      .then((response) => {
        this.armor = response.data.content;
        this.filtered_armor = response.data.content;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.armor);

      if (this.name_filter) {
        filtered = _.filter(filtered, armor => armor.name.toLowerCase().indexOf(this.name_filter.toLowerCase()) > -1);
      }

      if (this.category_filter) {
        filtered = _.filter(filtered, { armor_category: this.category_filter });
      }

      if (this.stealth_filter) {
        filtered = _.filter(filtered, armor => (this.stealth_filter === 'Yes' ? armor.stealth_disadvantage : !armor.stealth_disadvantage));
      }

      if (this.min_str_filter) {
        filtered = _.filter(filtered, armor => (this.min_str_filter === 'Yes' ? armor.str_minimum > 0 : armor.str_minimum === 0));
      }

      this.filtered_armor = _.cloneDeep(filtered);
      this.current_sorted_property = '';
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_armor);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        sorted = _.sortBy(sorted, [property]);
        this.current_sorted_property = property;
      }

      this.filtered_armor = _.cloneDeep(sorted);
    },
  },
  watch: {
    selected_armor(new_value) {
      this.show_modal = !!new_value;
    },
    category_filter() {
      this.filter();
    },
    min_str_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
    stealth_filter() {
      this.filter();
    },
  },
};
</script>

<style scoped>
  .info-table tr {
    cursor: pointer;
  }
</style>
