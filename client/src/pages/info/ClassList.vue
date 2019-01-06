<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span v-html='feather.icons["alert-octagon"].toSvg()'></span> There was a problem retrieving the info
      </uiv-alert>
    </div>
    <div v-else class='container class-info'>
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

              <div class='flex-row'>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Hit Dice</div>
                    <div class='panel-body'>
                      d{{ entry.hit_die }}
                    </div>
                  </div>
                </div>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Spellcasting Class</div>
                    <div class='panel-body'>
                      {{ entry.spellcasting.class || 'N/A' }}
                    </div>
                  </div>
                </div>
              </div>

              <div class='flex-row'>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Saving Throw Proficiencies</div>
                    <ul class='list-group'>
                      <li class='list-group-item' v-for='item in entry.saving_throws' :key='item.name'>{{ item.name }}</li>
                    </ul>
                  </div>
                </div>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Subclasses</div>
                    <div class='list-group'>
                      <a href='#' class='list-group-item info-link' v-for='item in entry.subclasses' :key='item.name'>{{ item.name }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class='flex-row'>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Default Proficiencies</div>
                    <ul class='list-group'>
                      <li class='list-group-item' v-for='item in entry.proficiencies'
                          :key='item.name'>
                        {{ item.name }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class='flex-column'>
                  <div class='panel panel-default'>
                    <div class='panel-heading'>Proficiency Choices</div>
                    <ul class='list-group' v-for='(item, index) in entry.proficiency_choices' :key='index'>
                      <li class='list-group-item' style='font-weight: bold; text-align: center;'>Choose {{ item.choose }} from</li>
                      <li class='list-group-item' v-for='choice in item.from' :key='choice.name'>
                        <div v-if='isSkill(choice)'>
                          <span class='info-link' :id='`${entry.name}_skill${sanitize(choice.name)}`'>{{ choice.name }}</span>
                          <uiv-popover placement='right' :target='`#${entry.name}_skill${sanitize(choice.name)}`' :title='choice.name' trigger='hover'>
                            <template slot='popover'>
                              <skill-popup-details :skill='choice.name' />
                            </template>
                          </uiv-popover>
                        </div>
                        <div v-else>
                          {{ choice.name }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

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
import SkillPopupDetails from '../../components/info/popups/SkillPopupDetails.vue';

export default {
  name: 'classes_list',
  components: {
    'skill-popup-details': SkillPopupDetails,
  },
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
    isSkill(skill) {
      return skill.name.includes('Skill:');
    },
    sanitize(name) {
      return name.replace(/ /g, '_').replace(/:/g, '').replace(/,/g, '').replace(/^\s+|\s+$/gm, '');
    },
  },
  watch: {
    name_filter() {
      this.filter();
    },
  },
};
</script>
