<template>
  <div id='info-page'>
    <h1 class='page-title'>Races</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load races
    </v-alert>

    <!-- List Loading Indicator -->
    <div v-else-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

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
      <div class='name-list'>
        <div v-for='item in filtered_items' class='name-list-entry' :key='item.name'>
          <router-link :to='{ name: "race_info", params: { race: item.name } }'>
            {{ item.name }}
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'race_list',
  data() {
    return {
      error: false,
      filter_name: '',
      filtered_items: null,
      items: null,
    };
  },
  mounted() {
    this.$http.get('/api/dnd/races')
      .then((response) => {
        const items = _.sortBy(response.data.content, ['name']);
        this.items = items;
        this.filtered_items = items;
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
