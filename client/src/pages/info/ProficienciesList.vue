<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span v-html='feather.icons["alert-octagon"].toSvg()'></span> There was a problem retrieving the info
      </uiv-alert>
    </div>
    <div v-else class='container'>
      <div class='page-header'>
        <h1>Proficiencies</h1>
      </div>
      <div class='row'>
        <div class='col-xs-12 col-md-6'>
          <div class='form-group'>
            <div class='input-group'>
              <span class='input-group-addon'>
                <span v-html='feather.icons.search.toSvg()'></span>
              </span>
              <input type='text' class='form-control' id='name_filter' name='name_filter' placeholder='Filter' v-model.trim='name_filter' />
            </div>
          </div>
        </div>
        <div class='col-xs-12 col-md-6'>
          <div class='row'>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='type_filter' v-model='type_filter'>
                  <option value=''>All</option>
                  <option>Armor</option>
                  <option>Artisan's Tools</option>
                  <option>Gaming Sets</option>
                  <option>Musical Instruments</option>
                  <option>Other</option>
                  <option>Saving Throws</option>
                  <option>Skills</option>
                  <option>Vehicles</option>
                  <option>Weapons</option>
                </select>
                <p class='help-block'>Type</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='race_filter' v-model='race_filter'>
                  <option value=''>All</option>
                  <option>Dragonborn</option>
                  <option>Dwarf</option>
                  <option>Elf</option>
                  <option>Gnome</option>
                  <option>Half-Elf</option>
                  <option>Half-Orc</option>
                  <option>Halfling</option>
                  <option>Human</option>
                  <option>Tiefling</option>
                </select>
                <p class='help-block'>Race</p>
              </div>
            </div>
            <div class='col-xs-4'>
              <div class='form-group'>
                <select class='form-control' id='class_filter' v-model='class_filter'>
                  <option value=''>All</option>
                  <option>Barbarian</option>
                  <option>Bard</option>
                  <option>Cleric</option>
                  <option>Druid</option>
                  <option>Fighter</option>
                  <option>Monk</option>
                  <option>Paladin</option>
                  <option>Ranger</option>
                  <option>Rogue</option>
                  <option>Sorcerer</option>
                  <option>Warlock</option>
                  <option>Wizard</option>
                </select>
                <p class='help-block'>Class</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='table-responsive'>
        <table class='table table-striped table-bordered info-table no-modal'>
          <thead>
            <tr>
              <th @click="sortBy('name')">Name</th>
              <th @click="sortBy('type')">Type</th>
              <th @click="sortBy('races')">Races</th>
              <th @click="sortBy('classes')">Classes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='proficiency in filtered_proficiencies' :key='proficiency.index'>
              <td>{{ proficiency.name }}</td>
              <td>{{ proficiency.type }}</td>
              <td>{{ renderRaces(proficiency) }}</td>
              <td>{{ renderClasses(proficiency) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import feather from 'feather-icons';

export default {
  name: 'proficiencies_list',
  data() {
    return {
      current_sorted_property: 'name',
      error: false,
      feather,
      filtered_proficiencies: null,
      proficiencies: null,

      class_filter: '',
      name_filter: '',
      race_filter: '',
      type_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/proficiencies')
      .then((response) => {
        const proficiencies = _.sortBy(response.data.content, ['name']);
        this.proficiencies = proficiencies;
        this.filtered_proficiencies = proficiencies;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.proficiencies);

      if (this.name_filter) {
        filtered = _.filter(filtered, proficiency => proficiency.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      if (this.type_filter) {
        filtered = _.filter(filtered, { type: this.type_filter });
      }

      if (this.class_filter) {
        filtered = _.filter(filtered, (proficiency) => {
          const proficiency_classes = _.map(proficiency.classes, c => c.name);
          return proficiency_classes.indexOf(this.class_filter) > -1;
        });
      }

      if (this.race_filter) {
        filtered = _.filter(filtered, (proficiency) => {
          let match = false;
          _.map(proficiency.races, r => r.name).forEach((race) => {
            if (race.includes(this.race_filter)) match = true;
          });
          return match;
        });
      }

      this.filtered_proficiencies = _.cloneDeep(filtered);
    },
    renderClasses(prof) {
      return _.join(_.map(prof.classes, c => c.name), ', ');
    },
    renderRaces(prof) {
      return _.join(_.map(prof.races, r => r.name), ', ');
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_proficiencies);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        if (property === 'classes' || property === 'races') {
          sorted = _.sortBy(sorted, prof => (prof[property][0] ? prof[property][0].name : ''));
        }
        else {
          sorted = _.sortBy(sorted, [property]);
        }
        this.current_sorted_property = property;
      }

      this.filtered_proficiencies = _.cloneDeep(sorted);
    },
  },
  watch: {
    class_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
    race_filter() {
      this.filter();
    },
    type_filter() {
      this.filter();
    },
  },
};
</script>
