<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span v-html='feather.icons["alert-octagon"].toSvg()'></span> There was a problem retrieving the races
      </uiv-alert>
    </div>
    <div v-else class='container class-info'>
      <div class='page-header'>
        <h1>Races</h1>
      </div>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='form-group'>
            <div class='input-group'>
              <span class='input-group-addon'>
                <span v-html='feather.icons.search.toSvg()'></span>
              </span>
              <input type='text' class='form-control' id='name_filter' name='name_filter' placeholder='Filter' v-model.trim='name_filter' />
            </div>
          </div>
        </div>
      </div>

      <div class='flex-row'>
        <div class='flex-column' v-for='entry in filtered_races' :key='entry.index'>
          <div class='panel panel-default'>
            <div class='panel-body'>
              <a :href='`/info/races/${entry.name.toLowerCase()}`'>
                <h3>{{ entry.name }}</h3>
              </a>
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
  name: 'races_list',
  data() {
    return {
      error: false,
      feather,
      filtered_races: null,
      name_filter: '',
      races: null,
    };
  },
  mounted() {
    this.$http.get('/api/dnd/races')
      .then((response) => {
        const races = _.sortBy(response.data.content, ['name']);
        this.races = races;
        this.filtered_races = races;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.races);

      if (this.name_filter) {
        filtered = _.filter(filtered, skill => skill.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      this.filtered_races = _.cloneDeep(filtered);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>

<style lang='scss' scoped>
h3 {
  margin: 0;
}
</style>
