<template>
  <div id='info-page'>
    <h1 style='margin-bottom: 1rem;'>Conditions</h1>

    <!-- List Loading Indicator -->
    <div v-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <v-alert v-else-if='error' :value='true' type='error'>
      Failed to load conditions
    </v-alert>

    <!-- List Display -->
    <div v-else>
      <!-- Filter Controls -->
      <div id='filter-controls'>
        <div class='w-full'>
          <v-text-field v-model='filter_name' clearable label='Filter'
                        prepend-inner-icon='fa-search'></v-text-field>
        </div>
      </div>

      <!-- List -->
      <v-list class='info-list' three-line>
        <v-list-tile v-for='item in filtered_items' class='info-list-tile' :key='item.name'>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-sub-title class='text--primary'>
              <div v-for='entry in item.desc' :key='entry'>{{ entry }}</div>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'conditions_list',
  data() {
    return {
      error: false,
      filter_name: '',
      filtered_items: null,
      items: null,
    };
  },
  mounted() {
    this.$http.get('/api/dnd/conditions')
      .then((response) => {
        const conditions = _.sortBy(response.data.content, ['name']);
        this.items = conditions;
        this.filtered_items = conditions;
      })
      .catch(() => {
        this.error = true;
      });
  },
  watch: {
    filter_name(value) {
      let filtered = _.cloneDeep(this.items);
      filtered = _.filter(filtered, item => item.name.toLowerCase().includes(value.toLowerCase()));
      this.filtered_items = _.cloneDeep(filtered);
    },
  },
};
</script>
