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
            <label for='category_filter' class='control-label'>Filter</label>
            <div class='input-group'>
              <span class='input-group-addon'>
                <span class='glyphicon glyphicon-search' aria-hidden='true'></span>
              </span>
              <input type='text' class='form-control' placeholder='Filter'>
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-md-6'>
          <div class='form-group'>
            <label for='category_filter' class='control-label'>Category Filter</label>
            <select class='form-control' id='category_filter'>
                <option value=''>All</option>
                <option>Light</option>
                <option>Medium</option>
                <option>Heavy</option>
                <option>Shield</option>
              </select>
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
            <tr v-for='item in filtered_armor' :key='item.id'>
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
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'armor_list',
  data() {
    return {
      armor: null,
      current_sorted_property: '',
      error: false,
      filtered_armor: null,
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
};
</script>

<style scoped>
  .info-table tr {
    cursor: pointer;
  }
</style>
