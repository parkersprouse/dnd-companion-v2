<template>
  <div id='info-page'>
    <h1 style='margin-bottom: 1rem;'>Weapon Properties</h1>

    <!-- List Loading Indicator -->
    <div v-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <v-alert v-else-if='error' :value='true' type='error'>
      Failed to load weapon properties
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
      <div class='info-list'>
        <div v-for='item in filtered_items' class='info-list-entry' :key='item.name'>
          <div class='info-list-entry-title'>{{ item.name }}</div>
          <div class='info-list-entry-content'>
            <div v-for='entry in item.desc' :key='entry'>{{ entry }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'damage_types_list',
  data() {
    return {
      error: false,
      filter_name: '',
      filtered_items: null,
      items: null,
    };
  },
  mounted() {
    this.$http.get('/api/dnd/weapon_properties')
      .then((response) => {
        const weapon_properties = _.sortBy(response.data.content, ['name']);
        this.items = weapon_properties;
        this.filtered_items = weapon_properties;
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
