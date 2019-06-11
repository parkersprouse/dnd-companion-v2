<template>
  <v-dialog v-model='show' fullscreen hide-overlay transition='dialog-bottom-transition'>
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ value }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click='show = false'>
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Error Alert -->
      <v-alert v-if='error' :value='true' type='error'>
        Failed to load subrace
      </v-alert>

      <!-- Loading Indicator -->
      <div v-else-if='!subrace' class='text-xs-center'>
        <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
      </div>

      <div v-else class='container'>
        <div id='info-page'>

          <div class='details-info-row thirds'>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Description</div>
              <div class='details-info-entry-content'>
                <div>{{ subrace.desc }}</div>
              </div>
            </div>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Additional Ability Bonuses</div>
              <div class='details-info-entry-content'>
                <table>
                  <tbody>
                    <tr>
                      <td>Strength</td>
                      <td>{{ ability_score(subrace.ability_bonuses[0]) }}</td>
                    </tr>
                    <tr>
                      <td>Dexterity</td>
                      <td>{{ ability_score(subrace.ability_bonuses[1]) }}</td>
                    </tr>
                    <tr>
                      <td>Constitution</td>
                      <td>{{ ability_score(subrace.ability_bonuses[2]) }}</td>
                    </tr>
                    <tr>
                      <td>Intelligence</td>
                      <td>{{ ability_score(subrace.ability_bonuses[3]) }}</td>
                    </tr>
                    <tr>
                      <td>Wisdom</td>
                      <td>{{ ability_score(subrace.ability_bonuses[4]) }}</td>
                    </tr>
                    <tr>
                      <td>Charisma</td>
                      <td>{{ ability_score(subrace.ability_bonuses[5]) }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-if='subrace.ability_score_extra'>{{ subrace.ability_score_extra }}</div>
              </div>
            </div>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Languages</div>
              <div class='details-info-entry-content'>
                <div v-if='languages.length === 0 && lang_options.length === 0'>None</div>
                <ul v-if='languages.length > 0' class='list'>
                  <li v-for='lang in languages' :key='lang.name'>
                    {{ lang.name }}
                  </li>
                </ul>
                <div v-if='lang_options.length > 0'>
                  <div>Select {{ subrace.language_options.choose }} from:</div>
                  <ul class='list'>
                    <li v-for='lang in lang_options' :key='lang.name'>
                      {{ lang.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class='details-info-row thirds'>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Proficiencies</div>
              <div class='details-info-entry-content'>
                <div v-if='starting_proficiencies.length === 0'>None</div>
                <ul v-else class='list'>
                  <li v-for='prof in starting_proficiencies' :key='prof.name'>
                    {{ prof.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Proficiency Options</div>
              <div class='details-info-entry-content'>
                <div v-if='proficiency_options.length === 0'>None</div>
                <div v-else>
                  <div>Select {{ subrace.starting_proficiency_options.choose }} from:</div>
                  <ul class='list'>
                    <li v-for='prof in proficiency_options' :key='prof.name'>
                      {{ prof.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class='details-info-entry'>
              <div class='details-info-entry-title'>Traits</div>
              <div class='details-info-entry-content'>
                <div v-if='traits.length === 0 && trait_options.length === 0'>None</div>
                <ul v-if='traits.length > 0' class='list'>
                  <li v-for='trait in traits' :key='trait.name'>
                    <trait-popover :name='trait.name' />
                  </li>
                </ul>
                <div v-if='trait_options.length > 0'>
                  <div>Select {{ subrace.trait_options.choose }} from:</div>
                  <ul class='list'>
                    <li v-for='trait in trait_options' :key='trait.name'>
                      <trait-popover :name='trait.name' />
                    </li>
                  </ul>
                </div>
                <div v-if='subrace.trait_options_desc'>
                  {{ subrace.trait_options_desc }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash';
import TraitPopover from '@/components/info/TraitPopover.vue';

export default {
  name: 'subrace_dialog',
  props: {
    value: {
      required: false,
      type: String,
    },
  },
  components: {
    'trait-popover': TraitPopover,
  },
  data() {
    return {
      error: false,
      show: false,
      subrace: null,
    };
  },
  methods: {
    ability_score(score) {
      if (score) return `+${score}`;
      return score;
    },

    close() {
      this.$emit('input', null);
    },
  },
  computed: {
    lang_options() {
      return _.sortBy(this.subrace.language_options.from, ['name']);
    },

    languages() {
      return _.sortBy(this.subrace.languages, ['name']);
    },

    proficiency_options() {
      return _.sortBy(this.subrace.starting_proficiency_options.from, ['name']);
    },

    starting_proficiencies() {
      return _.sortBy(this.subrace.starting_proficiencies, ['name']);
    },

    trait_options() {
      return _.sortBy(this.subrace.trait_options.from, ['name']);
    },

    traits() {
      return _.sortBy(this.subrace.traits, ['name']);
    },
  },
  watch: {
    show(new_val) {
      if (!new_val) this.close();
      else {
        this.subrace = null;
        this.$http.post('/api/dnd/subraces', { name: this.value })
          .then((response) => {
            this.subrace = response.data.content[0];
          })
          .catch(() => {
            this.error = true;
          });
      }
    },

    value(new_val) {
      this.show = !!new_val;
    },
  },
};
</script>
