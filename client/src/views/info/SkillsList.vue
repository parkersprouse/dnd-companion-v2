<template>
  <div id='info-page'>
    <h1 class='page-title'>Skills</h1>

    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load skills
    </v-alert>

    <!-- List Loading Indicator -->
    <div v-else-if='!filtered_items' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <!-- List Display -->
    <div v-else>
      <!-- Filter Controls -->
      <div id='filter-controls'>
        <div>
          <v-text-field v-model='filter_name' clearable label='Filter'
                        prepend-inner-icon='fa-search'></v-text-field>
        </div>
        <div class='whole'>
          <div>
            <v-select v-model='filter_ability' :items='filter_ability_opts' label='Ability Score'
                      menu-props='offsetY'></v-select>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class='info-list'>
        <div v-for='item in filtered_items' class='info-list-entry' :key='item.name'>
          <div class='info-list-entry-title'>{{ item.name }} ({{ item.ability_score.name }})</div>
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
  name: 'skills_list',
  data() {
    return {
      error: false,
      filter_ability: '',
      filter_name: '',
      filtered_items: null,
      items: null,

      filter_ability_opts: [
        { text: 'All', value: '' },
        { text: 'Charisma', value: 'Charisma' },
        { text: 'Constitution', value: 'Constitution' },
        { text: 'Dexterity', value: 'Dexterity' },
        { text: 'Intelligence', value: 'Intelligence' },
        { text: 'Strength', value: 'Strength' },
        { text: 'Wisdom', value: 'Wisdom' },
      ],
    };
  },
  mounted() {
    this.$http.get('/api/dnd/skills')
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

      if (this.filter_name) {
        filtered = _.filter(filtered, (skill) => {
          const lower_filter = this.filter_name.toLowerCase();
          const name_includes = skill.name.toLowerCase().includes(lower_filter);
          const ability_includes = skill.ability_score.name.toLowerCase().includes(lower_filter);
          return name_includes || ability_includes;
        });
      }

      if (this.filter_ability) {
        filtered = _.filter(filtered, (skill) => {
          const lower_ability = skill.ability_score.name.toLowerCase();
          return this.filter_ability.toLowerCase().includes(lower_ability);
        });
      }

      this.filtered_items = _.cloneDeep(filtered);
    },
  },
  watch: {
    filter_ability() {
      this.filter();
    },

    filter_name() {
      this.filter();
    },
  },
};
</script>
