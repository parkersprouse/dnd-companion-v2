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
        <h1>Weapons</h1>
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
                  <option>Simple</option>
                  <option>Martial</option>
                </select>
                <p class='help-block'>Category</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='range_filter' v-model='range_filter'>
                  <option value=''>All</option>
                  <option>Melee</option>
                  <option>Ranged</option>
                </select>
                <p class='help-block'>Range</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='property_filter' v-model='property_filter'>
                  <option value=''>All</option>
                  <option>Ammunition</option>
                  <option>Finesse</option>
                  <option>Heavy</option>
                  <option>Light</option>
                  <option>Loading</option>
                  <option>Reach</option>
                  <option>Special</option>
                  <option>Thrown</option>
                  <option>Two-Handed</option>
                  <option>Versatile</option>
                </select>
                <p class='help-block'>Property</p>
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
              <th @click="sortBy('weapon_category')">Category</th>
              <th @click="sortBy('weapon_range')">Range</th>
              <th @click="sortBy('damage')">Damage</th>
              <th @click="sortBy('property')">Properties</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='weapon in filtered_weapons' :key='weapon.index' @click='selected_weapon = weapon'>
              <td>{{ weapon.name }}</td>
              <td>{{ weapon.weapon_category  }}</td>
              <td>{{ weapon.weapon_range }}</td>
              <td>{{ renderDamage(weapon) }}</td>
              <td>{{ renderProperties(weapon) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <uiv-modal v-model='show_modal' :title="show_modal ? selected_weapon.name : ''" @hide='selected_weapon = null' ref='modal' id='weapon-modal'>
      <weapon-details :weapon='selected_weapon' />
      <div slot='footer'>
        <uiv-btn @click='show_modal = false'>Close</uiv-btn>
      </div>
    </uiv-modal>

  </div>
</template>

<script>
import _ from 'lodash';
import WeaponDetails from '../../components/info/WeaponDetails.vue';

export default {
  name: 'weapon_list',
  components: {
    'weapon-details': WeaponDetails,
  },
  data() {
    return {
      weapons: null,
      current_sorted_property: 'name',
      error: false,
      filtered_weapons: null,
      selected_weapon: null,
      show_modal: false,

      category_filter: '',
      range_filter: '',
      name_filter: '',
      property_filter: '',
    };
  },
  mounted() {
    this.$http.post('/api/dnd/equipment', { equipment_category: 'Weapon' })
      .then((response) => {
        const weapons = _.sortBy(response.data.content, ['name']);
        this.weapons = weapons;
        this.filtered_weapons = weapons;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.weapons);

      if (this.name_filter) {
        filtered = _.filter(filtered, weapon => weapon.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      if (this.category_filter) {
        filtered = _.filter(filtered, { weapon_category: this.category_filter });
      }

      if (this.property_filter) {
        filtered = _.filter(filtered, (weapon) => {
          const weapon_props = _.map(weapon.properties, wp => wp.name);
          return weapon_props.includes(this.property_filter);
        });
      }

      if (this.range_filter) {
        filtered = _.filter(filtered, { weapon_range: this.range_filter });
      }

      this.filtered_weapons = _.cloneDeep(filtered);
      this.current_sorted_property = '';
    },
    renderDamage(weapon) {
      let weapon_damage = '-';
      if (weapon.damage && weapon.damage.damage_type) {
        if (weapon.damage.dice_value === 0) {
          weapon_damage = `${weapon.damage.dice_count} ${weapon.damage.damage_type.name}`;
        }
        else {
          weapon_damage = `${weapon.damage.dice_count}d${weapon.damage.dice_value} ${weapon.damage.damage_type.name}`;
        }
      }
      return weapon_damage;
    },
    renderProperties(weapon) {
      return _.join(_.map(weapon.properties, prop => prop.name), ', ');
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_weapons);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        if (property === 'damage') {
          sorted = _.sortBy(sorted, ['damage.dice_value', 'damage.dice_count']);
        }
        else if (property === 'property') {
          sorted = _.sortBy(sorted, weapon => (weapon.properties[0] ? weapon.properties[0].name : ''));
        }
        else {
          sorted = _.sortBy(sorted, [property]);
        }
        this.current_sorted_property = property;
      }

      this.filtered_weapons = _.cloneDeep(sorted);
    },
  },
  watch: {
    selected_weapon(new_value) {
      this.show_modal = !!new_value;
    },
    category_filter() {
      this.filter();
    },
    range_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
    property_filter() {
      this.filter();
    },
  },
};
</script>
