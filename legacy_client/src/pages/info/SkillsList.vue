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
        <h1>Skills</h1>
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
          <div class='form-group'>
            <select class='form-control' id='ability_filter' v-model='ability_filter'>
              <option value=''>All</option>
              <option>Charisma</option>
              <option>Constitution</option>
              <option>Dexterity</option>
              <option>Intelligence</option>
              <option>Strength</option>
              <option>Wisdom</option>
            </select>
            <p class='help-block'>Ability Score</p>
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
import feather from 'feather-icons';

export default {
  name: 'skills_list',
  data() {
    return {
      error: false,
      feather,
      filtered_skills: null,
      skills: null,

      ability_filter: '',
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

      if (this.ability_filter) {
        filtered = _.filter(filtered, (skill) => {
          const lower_ability = skill.ability_score.name.toLowerCase();
          return this.ability_filter.toLowerCase().includes(lower_ability);
        });
      }

      this.filtered_skills = _.cloneDeep(filtered);
    },
  },
  watch: {
    ability_filter() {
      this.filter();
    },
    name_filter() {
      this.filter();
    },
  },
};
</script>
