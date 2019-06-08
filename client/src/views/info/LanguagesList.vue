<template>
  <div id='info-page'>
    <h1 style='margin-bottom: 1rem;'>Languages</h1>

    <!-- Table Loading Indicator -->
    <div v-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <v-alert v-else-if='error' :value='true' type='error'>
      Failed to load languages
    </v-alert>

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
            <v-select v-model='filter_type' :items='filter_type_opts' label='Type'
                      menu-props='offsetY'></v-select>
          </div>
          <div>
            <v-select v-model='filter_script' :items='filter_script_opts' label='Script'
                      menu-props='offsetY'></v-select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <v-data-table v-if='filtered_items' class='elevation-1' :headers='headers' hide-actions
                   :items='filtered_items' must-sort :search='filter_name'
                    sort-icon='fa-arrow-up ml-2'>
        <template v-slot:items='props'>
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ props.item.script || '-' }}</td>
            <td>{{ speakers(props.item) }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'languages_list',
  data() {
    return {
      error: false,
      filter_name: '',
      filter_script: '',
      filter_type: '',
      filtered_items: null,
      items: null,

      filter_script_opts: [
        { text: 'All', value: '' },
        { text: 'Celestial', value: 'Celestial' },
        { text: 'Common', value: 'Common' },
        { text: 'Draconic', value: 'Draconic' },
        { text: 'Dwarvish', value: 'Dwarvish' },
        { text: 'Elvish', value: 'Elvish' },
        { text: 'Infernal', value: 'Infernal' },
      ],
      filter_type_opts: [
        { text: 'All', value: '' },
        { text: 'Exotic', value: 'Exotic' },
        { text: 'Standard', value: 'Standard' },
      ],
      headers: [
        { text: 'Name', value: 'name', class: 'info-table-column-header' },
        { text: 'Type', value: 'type', class: 'info-table-column-header' },
        { text: 'Script', value: 'script', class: 'info-table-column-header' },
        {
          text: 'Typical Speakers', value: 'typical_speakers[0]', class: 'info-table-column-header',
        },
      ],
    };
  },
  mounted() {
    this.$http.post('/api/dnd/languages')
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
    filter() {
      let filtered = _.cloneDeep(this.items);

      if (this.filter_type) {
        filtered = _.filter(filtered, { type: this.filter_type });
      }

      if (this.filter_script) {
        filtered = _.filter(filtered, { script: this.filter_script });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },

    speakers(item) {
      return _.join(item.typical_speakers, ', ');
    },
  },
  watch: {
    filter_type() {
      this.filter();
    },

    filter_script() {
      this.filter();
    },
  },
};
</script>
