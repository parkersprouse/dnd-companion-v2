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
        <h1>Languages</h1>
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
            <div class='col-xs-6'>
              <div class='form-group'>
                <select class='form-control' id='type_filter' v-model='type_filter'>
                  <option value=''>All</option>
                  <option>Exotic</option>
                  <option>Standard</option>
                </select>
                <p class='help-block'>Type</p>
              </div>
            </div>
            <div class='col-xs-6'>
              <div class='form-group'>
                <select class='form-control' id='script_filter' v-model='script_filter'>
                  <option value=''>All</option>
                  <option>Celestial</option>
                  <option>Common</option>
                  <option>Draconic</option>
                  <option>Dwarvish</option>
                  <option>Elvish</option>
                  <option>Infernal</option>
                </select>
                <p class='help-block'>Script</p>
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
              <th @click="sortBy('script')">Script</th>
              <th @click="sortBy('speaker')">Typical Speakers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='lang in filtered_languages' :key='lang.index'>
              <td>{{ lang.name }}</td>
              <td>{{ lang.type }}</td>
              <td>{{ lang.script || '-' }}</td>
              <td>{{ renderSpeakers(lang) }}</td>
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
  name: 'languages_list',
  data() {
    return {
      current_sorted_property: 'name',
      error: false,
      feather,
      filtered_languages: null,
      languages: null,

      name_filter: '',
      script_filter: '',
      type_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/languages')
      .then((response) => {
        const languages = _.sortBy(response.data.content, ['name']);
        this.languages = languages;
        this.filtered_languages = languages;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.languages);

      if (this.name_filter) {
        filtered = _.filter(filtered, lang => lang.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      if (this.script_filter) {
        filtered = _.filter(filtered, { script: this.script_filter });
      }

      if (this.type_filter) {
        filtered = _.filter(filtered, { type: this.type_filter });
      }

      this.filtered_languages = _.cloneDeep(filtered);
    },
    renderSpeakers(lang) {
      return _.join(lang.typical_speakers, ', ');
    },
    sortBy(property) {
      let sorted = _.cloneDeep(this.filtered_languages);

      if (this.current_sorted_property === property) {
        sorted = _.reverse(sorted);
      }
      else {
        if (property === 'speaker') {
          sorted = _.sortBy(sorted, lang => lang.typical_speakers[0]);
        }
        else {
          sorted = _.sortBy(sorted, [property]);
        }
        this.current_sorted_property = property;
      }

      this.filtered_languages = _.cloneDeep(sorted);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
    script_filter() {
      this.filter();
    },
    type_filter() {
      this.filter();
    },
  },
};
</script>
