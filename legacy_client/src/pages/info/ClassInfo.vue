<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span v-html='feather.icons["alert-octagon"].toSvg()'></span> There was a problem retrieving the class info
      </uiv-alert>
    </div>
    <div v-else-if='!data' class='container'>
      Loading...
    </div>
    <div v-else class='container class-info'>
      <div class='page-header'>
        <h1>{{ data.name }}</h1>
      </div>

      <div class='flex-row'>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Hit Dice</div>
            <div class='panel-body'>
              d{{ data.hit_die }}
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Spellcasting Class</div>
            <div class='panel-body'>
              {{ data.spellcasting.class || 'N/A' }}
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Saving Throw Proficiencies</div>
            <ul class='list-group'>
              <li class='list-group-item' v-for='item in data.saving_throws' :key='item.name'>{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Subclasses</div>
            <div class='list-group'>
              <a href='#' class='list-group-item info-link' v-for='item in data.subclasses' :key='item.name'>{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Default Proficiencies</div>
            <ul class='list-group'>
              <li class='list-group-item' v-for='item in data.proficiencies'
                  :key='item.name'>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Proficiency Choices</div>
            <ul class='list-group' v-for='(item, index) in data.proficiency_choices' :key='index'>
              <li class='list-group-item' style='font-weight: bold; text-align: center;'>Choose {{ item.choose }} from</li>
              <li class='list-group-item' v-for='choice in item.from' :key='choice.name'>
                <div v-if='isSkill(choice)'>
                  <span class='info-link' :id='`${data.name}_skill${sanitize(choice.name)}`'>{{ choice.name }}</span>
                  <uiv-popover placement='right' :target='`#${data.name}_skill${sanitize(choice.name)}`' :title='choice.name' trigger='hover'>
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
</template>

<script>
import _ from 'lodash';
import feather from 'feather-icons';
import SkillPopupDetails from '../../components/info/popups/SkillPopupDetails.vue';

export default {
  name: 'class_info',
  components: {
    'skill-popup-details': SkillPopupDetails,
  },
  data() {
    return {
      data: null,
      error: false,
      feather,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/classes', { name: _.capitalize(this.$route.params.classname) })
      .then((response) => {
        this.data = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    isSkill(skill) {
      return skill.name.includes('Skill:');
    },

    sanitize(name) {
      return name.replace(/ /g, '_').replace(/:/g, '').replace(/,/g, '').replace(/^\s+|\s+$/gm, '');
    },
  },
};
</script>
