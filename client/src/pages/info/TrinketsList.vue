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
        <h1>Trinkets</h1>
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
      <div class='table-responsive'>
        <table class='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>d100 Roll</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='trinket in filtered_trinkets' :key='trinket.roll'>
              <td>{{ trinket.roll }}</td>
              <td>{{ trinket.desc  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'trinkets_list',
  data() {
    return {
      error: false,
      filtered_trinkets: null,
      trinkets: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/trinkets')
      .then((response) => {
        this.trinkets = response.data.content;
        this.filtered_trinkets = response.data.content;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.trinkets);

      if (this.name_filter) {
        filtered = _.filter(filtered, trinket => trinket.desc.toLowerCase().includes(this.name_filter.toLowerCase()) || trinket.roll.includes(this.name_filter));
      }

      this.filtered_trinkets = _.cloneDeep(filtered);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
