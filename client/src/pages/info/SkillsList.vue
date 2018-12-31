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
        <h1>Skills</h1>
      </div>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='form-group'>
            <div class='input-group'>
              <span class='input-group-addon'>
                <span class='glyphicon glyphicon-search' aria-hidden='true'></span>
              </span>
              <input type='text' class='form-control' id='name_filter' name='name_filter' placeholder='Filter' v-model.trim='name_filter' />
            </div>
          </div>
        </div>
      </div>

      <div class='flex-row'>
        <div class='flex-column' v-for='skill in filtered_skills' :key='skill.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ skill.name }} ({{ skill.ability_score.name }})</h3>
            </div>
            <div class='panel-body'>
              <p v-for='entry in skill.desc' :key='entry'>{{ entry }}</p>
            </div>
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
      skills: null,
      filtered_skills: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/skills')
      .then((response) => {
        const skills = _.sortBy(response.data.content, ['name']);
        this.skills = skills;
        this.filtered_skills = skills;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.skills);

      if (this.name_filter) {
        filtered = _.filter(filtered, (skill) => {
          const lower_filter = this.name_filter.toLowerCase();
          const name_includes = skill.name.toLowerCase().includes(lower_filter);
          const ability_includes = skill.ability_score.name.toLowerCase().includes(lower_filter);
          return name_includes || ability_includes;
        });
      }

      this.filtered_skills = _.cloneDeep(filtered);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
