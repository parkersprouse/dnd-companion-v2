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
        <h1>Damage Types</h1>
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
        <div class='flex-column' v-for='type in filtered_damage_types' :key='type.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ type.name }}</h3>
            </div>
            <div class='panel-body'>
              <p v-for='entry in type.desc' :key='entry'>{{ entry }}</p>
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
  name: 'damage_types_list',
  data() {
    return {
      error: false,
      damage_types: null,
      filtered_damage_types: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/damage_types')
      .then((response) => {
        const damage_types = _.sortBy(response.data.content, ['name']);
        this.damage_types = damage_types;
        this.filtered_damage_types = damage_types;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.damage_types);

      if (this.name_filter) {
        filtered = _.filter(filtered, type => type.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      this.filtered_damage_types = _.cloneDeep(filtered);
      this.current_sorted_property = '';
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
