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
        <h1>Conditions</h1>
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
        <div class='flex-column' v-for='condition in filtered_conditions' :key='condition.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ condition.name }}</h3>
            </div>
            <div class='panel-body'>
              <p v-for='entry in condition.desc' :key='entry'>{{ entry }}</p>
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
  name: 'conditions_list',
  data() {
    return {
      error: false,
      conditions: null,
      filtered_conditions: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/conditions')
      .then((response) => {
        this.conditions = response.data.content;
        this.filtered_conditions = response.data.content;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.conditions);

      if (this.name_filter) {
        filtered = _.filter(filtered, condition => condition.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      this.filtered_conditions = _.cloneDeep(filtered);
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
