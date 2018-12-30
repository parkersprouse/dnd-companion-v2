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
        <h1>Spells</h1>
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
                <select class='form-control' id='level_filter' v-model='level_filter'>
                  <option value=''>All</option>
                  <option value='0'>Cantrips</option>
                  <option value='1'>Level 1</option>
                  <option value='2'>Level 2</option>
                  <option value='3'>Level 3</option>
                  <option value='4'>Level 4</option>
                  <option value='5'>Level 5</option>
                  <option value='6'>Level 6</option>
                  <option value='7'>Level 7</option>
                  <option value='8'>Level 8</option>
                  <option value='9'>Level 9</option>
                </select>
                <p class='help-block'>Level</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='class_filter' v-model='class_filter'>
                  <option value=''>All</option>
                  <option>Bard</option>
                  <option>Cleric</option>
                  <option>Druid</option>
                  <option>Paladin</option>
                  <option>Ranger</option>
                  <option>Sorcerer</option>
                  <option>Warlock</option>
                  <option>Wizard</option>
                </select>
                <p class='help-block'>Class</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='school_filter' v-model='school_filter'>
                  <option value=''>All</option>
                  <option>Abjuration</option>
                  <option>Conjuration</option>
                  <option>Divination</option>
                  <option>Enchantment</option>
                  <option>Evocation</option>
                  <option>Illusion</option>
                  <option>Necromancy</option>
                  <option>Transmutation</option>
                </select>
                <p class='help-block'>School</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='table-responsive'>
        <table class='table table-hover table-striped table-bordered info-table'>
          <thead>
            <tr>
              <th @click="sortBy('level')">Level</th>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('range')">Range</th>
              <th @click="sortBy('class')">Classes</th>
              <th @click="sortBy('school.name')">School</th>
              <th @click="sortBy('casting_time')">Casting Time</th>
              <th @click="sortBy('duration')">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in filtered_spells' :key='item.roll' @click='selected_spell = item'>
              <td>{{ item.level || 'Cantrip' }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.range }}</td>
              <td>{{ renderClasses(item) }}</td>
              <td>{{ item.school.name }}</td>
              <td>{{ item.casting_time }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <uiv-modal v-model='show_modal' :title="show_modal ? selected_spell.name : ''" @hide='selected_spell = null' ref='modal' id='spell-modal'>
      <spell-details :spell='selected_spell' />
      <div slot='footer'>
        <uiv-btn @click='show_modal = false'>Close</uiv-btn>
      </div>
    </uiv-modal>

  </div>
</template>

<script>
import _ from 'lodash';
import SpellDetails from '../../components/info/SpellDetails.vue';

export default {
  name: 'spells_list',
  components: {
    'spell-details': SpellDetails,
  },
  data() {
    return {
      current_sorted_property: 'name',
      error: false,
      filtered_spells: null,
      selected_spell: null,
      show_modal: false,
      spells: null,

      class_filter: '',
      level_filter: '',
      name_filter: '',
      school_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/spells')
      .then((response) => {
        const spells = _.sortBy(response.data.content, ['name']);
        this.spells = spells;
        this.filtered_spells = spells;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.spells);

      if (this.name_filter) {
        filtered = _.filter(filtered, spell => spell.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      if (this.class_filter) {
        filtered = _.filter(filtered, (spell) => {
          const spell_classes = _.map(spell.classes, sc => sc.name);
          return spell_classes.indexOf(this.class_filter) > -1;
        });
      }

      if (this.level_filter) {
        filtered = _.filter(filtered, { level: Number(this.level_filter) });
      }

      if (this.school_filter) {
        filtered = _.filter(filtered, { school: { name: this.school_filter } });
      }

      this.filtered_spells = _.cloneDeep(filtered);
    },
    renderClasses(item) {
      return _.join(_.map(item.classes, sc => sc.name), ', ');
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_spells);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        if (property === 'class') {
          sorted = _.sortBy(sorted, spell => spell.classes[0].name);
        }
        else {
          sorted = _.sortBy(sorted, [property]);
        }
        this.current_sorted_property = property;
      }

      this.filtered_spells = _.cloneDeep(sorted);
    },
  },
  watch: {
    selected_spell(new_value) {
      this.show_modal = !!new_value;
    },
    class_filter() {
      this.filter();
    },
    level_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
    school_filter() {
      this.filter();
    },
  },
};
</script>
