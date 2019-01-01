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
        <h1>Classes</h1>
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
        <div class='flex-column' v-for='klass in filtered_classes' :key='klass.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ klass.name }}</h3>
            </div>
            <div class='panel-body'>
              {{ JSON.stringify(klass) }}
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
  name: 'classes_list',
  data() {
    return {
      error: false,
      classes: null,
      filtered_classes: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/classes')
      .then((response) => {
        const classes = _.sortBy(response.data.content, ['name']);
        this.classes = classes;
        this.filtered_classes = classes;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.classes);

      if (this.name_filter) {
        filtered = _.filter(filtered, skill => skill.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      this.filtered_classes = _.cloneDeep(filtered);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
