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
        <h1>Trinkets</h1>
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
import feather from 'feather-icons';

export default {
  name: 'trinkets_list',
  data() {
    return {
      error: false,
      feather,
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
        filtered = _.filter(filtered, (trinket) => {
          const lower_filter = this.name_filter.toLowerCase();
          const name_includes = trinket.desc.toLowerCase().includes(lower_filter);
          const roll_includes = trinket.roll.includes(lower_filter);
          return name_includes || roll_includes;
        });
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
