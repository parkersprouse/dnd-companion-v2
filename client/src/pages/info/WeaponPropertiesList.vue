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
        <h1>Weapon Properties</h1>
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
        <div class='flex-column' v-for='prop in filtered_weapon_properties' :key='prop.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ prop.name }}</h3>
            </div>
            <div class='panel-body'>
              <p v-for='entry in prop.desc' :key='entry'>{{ entry }}</p>
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
  name: 'weapon_properties_list',
  data() {
    return {
      error: false,
      feather,
      filtered_weapon_properties: null,
      weapon_properties: null,

      name_filter: '',
    };
  },
  mounted() {
    this.$http.get('/api/dnd/weapon_properties')
      .then((response) => {
        const weapon_properties = _.sortBy(response.data.content, ['name']);
        this.weapon_properties = weapon_properties;
        this.filtered_weapon_properties = weapon_properties;
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    filter() {
      let filtered = _.cloneDeep(this.weapon_properties);

      if (this.name_filter) {
        filtered = _.filter(filtered, prop => prop.name.toLowerCase().includes(this.name_filter.toLowerCase()));
      }

      this.filtered_weapon_properties = _.cloneDeep(filtered);
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
