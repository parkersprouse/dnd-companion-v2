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
        <h1>Classes</h1>
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
        <div class='flex-column' v-for='entry in filtered_classes' :key='entry.index'>
          <div class='panel panel-default'>
            <div class='panel-heading'>
              <h3 class='panel-title'>{{ entry.name }}</h3>
            </div>
            <div class='panel-body'>
              <p>Hit Dice: d{{ entry.hit_die }}</p>
              <p>Default Proficiencies: {{ renderDefaultProficiencies(entry) }}</p>
              <p>
                Proficiency Choices:
                <span style='display: block;' v-for='(item, index) in entry.proficiency_choices' :key='index'>
                  <strong>Choose {{ item.choose }} from:</strong><br/>{{ renderProficiencyChoices(item) }}
                </span>
              </p>
              <p>Saving Throw Proficiencies: {{ renderSavingThrows(entry) }}</p>
              <p>Subclasses: {{ renderSubclasses(entry) }}</p>
              <p>Spellcasting Class: {{ entry.spellcasting.class || 'N/A' }}</p>
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
  name: 'classes_list',
  data() {
    return {
      classes: null,
      error: false,
      feather,
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
    renderDefaultProficiencies(entry) {
      return _.join(_.map(entry.proficiencies, p => p.name), ', ');
    },
    renderProficiencyChoices(item) {
      return _.join(_.map(item.from, p => p.name), ', ');
    },
    renderSavingThrows(entry) {
      return _.join(_.map(entry.saving_throws, s => s.name), ', ');
    },
    renderSubclasses(entry) {
      return _.join(_.map(entry.subclasses, s => s.name), ', ');
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
