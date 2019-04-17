<template>
  <div>
    <main-navbar />
    <div v-if='error' class='container'>
      <uiv-alert type='danger'>
        <span v-html='feather.icons["alert-octagon"].toSvg()'></span> There was a problem retrieving the race info
      </uiv-alert>
    </div>
    <div v-else-if='!data' class='container'>
      Loading...
    </div>
    <div v-else class='container race-info'>
      <div class='page-header'>
        <h1>{{ data.name }}</h1>
      </div>

      <div class='flex-row'>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Speed</div>
            <div class='panel-body'>
              {{ data.speed }}
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Alignment</div>
            <div class='panel-body'>
              {{ data.alignment }}
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Age</div>
            <div class='panel-body'>
              {{ data.age }}
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Size</div>
            <div class='panel-body'>
              <p>{{ data.size }}</p>
              <hr style='margin: 15px -15px;' />
              <p>{{ data.size_description }}</p>
            </div>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Starting Proficiencies</div>
            <div v-if='!data.starting_proficiencies || data.starting_proficiencies.length === 0' class='panel-body'>
              <i>None</i>
            </div>
            <ul v-else class='list-group'>
              <li class='list-group-item' v-for='item in data.starting_proficiencies'
                  :key='item.name'>
                <div v-if='isSkill(item)'>
                  <span class='info-link' :id='`${data.name}_skill${sanitize(item.name)}`'>{{ item.name }}</span>
                  <uiv-popover placement='right' :target='`#${data.name}_skill${sanitize(item.name)}`' :title='item.name' trigger='hover'>
                    <template slot='popover'>
                      <skill-popup-details :skill='item.name' />
                    </template>
                  </uiv-popover>
                </div>
                <div v-else>
                  {{ item.name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Starting Proficiency Choices</div>
            <div v-if='!data.starting_proficiency_options || !data.starting_proficiency_options.from' class='panel-body'>
              <i>None</i>
            </div>
            <ul v-else class='list-group'>
              <li class='list-group-item' style='font-weight: bold; text-align: center;'>Choose {{ data.starting_proficiency_options.choose }} from</li>
              <li class='list-group-item' v-for='choice in data.starting_proficiency_options.from' :key='choice.name'>
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

        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Known Languages</div>
            <div v-if='!data.languages || data.languages.length === 0' class='panel-body'>
              <i>None</i>
            </div>
            <ul v-else class='list-group'>
              <li class='list-group-item' v-for='item in data.languages'
                  :key='item.name'>
                {{ item.name }}
              </li>
            </ul>
            <p style='padding: 15px;'>{{ data.language_desc }}</p>
          </div>
        </div>
        <div class='flex-column'>
          <div class='panel panel-default'>
            <div class='panel-heading'>Language Choices</div>
            <div v-if='!data.language_options || !data.language_options.from' class='panel-body'>
              <i>None</i>
            </div>
            <ul v-else class='list-group'>
              <li class='list-group-item' style='font-weight: bold; text-align: center;'>Choose {{ data.language_options.choose }} from</li>
              <li class='list-group-item' v-for='choice in data.language_options.from' :key='choice.name'>
                {{ choice.name }}
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
  name: 'race_info',
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
    const parts = this.$route.params.racename.split('-');
    const capitalized = parts.map(part => _.capitalize(part));
    this.$http.post('/api/dnd/races', { name: capitalized.join('-') })
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

<style lang='scss' scoped>
hr {
  border-color: rgba(0,0,0,0.6);
}
</style>
