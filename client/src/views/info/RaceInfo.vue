<template>
  <div id='info-page'>
    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load race
    </v-alert>

    <!-- Loading Indicator -->
    <div v-else-if='!race' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <div v-else>
      <h1 class='page-title'>{{ race.name }}</h1>

      <div class='details-info-row thirds'>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Ability Bonuses</div>
          <div class='details-info-entry-content'>
            <table>
              <tbody>
                <tr>
                  <td>Strength</td>
                  <td>{{ ability_score(race.ability_bonuses[0]) }}</td>
                </tr>
                <tr>
                  <td>Dexterity</td>
                  <td>{{ ability_score(race.ability_bonuses[1]) }}</td>
                </tr>
                <tr>
                  <td>Constitution</td>
                  <td>{{ ability_score(race.ability_bonuses[2]) }}</td>
                </tr>
                <tr>
                  <td>Intelligence</td>
                  <td>{{ ability_score(race.ability_bonuses[3]) }}</td>
                </tr>
                <tr>
                  <td>Wisdom</td>
                  <td>{{ ability_score(race.ability_bonuses[4]) }}</td>
                </tr>
                <tr>
                  <td>Charisma</td>
                  <td>{{ ability_score(race.ability_bonuses[5]) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Age</div>
          <div class='details-info-entry-content'>
            <div>{{ race.age }}</div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Alignment</div>
          <div class='details-info-entry-content'>
            <div>{{ race.alignment }}</div>
          </div>
        </div>
      </div>

      <div class='details-info-row thirds'>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Languages</div>
          <div class='details-info-entry-content'>
            <div v-if='languages.length === 0'>None</div>
            <ul v-else class='list'>
              <li v-for='lang in languages' :key='lang.name'>
                {{ lang.name }}
              </li>
            </ul>
            <div>{{ race.language_desc }}</div>
            <div v-if='lang_options.length > 0'>
              <div>Select {{ race.language_options.choose }} from:</div>
              <ul class='list'>
                <li v-for='lang in lang_options' :key='lang.name'>
                  {{ lang.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
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
              <div>Select {{ race.starting_proficiency_options.choose }} from:</div>
              <ul class='list'>
                <li v-for='prof in proficiency_options' :key='prof.name'>
                  {{ prof.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class='details-info-row thirds'>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Size / Speed</div>
          <div class='details-info-entry-content'>
            <div>{{ race.size_description }}</div>
            <div>You can move {{ race.speed }} ft. per round by default</div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Subraces</div>
          <div class='details-info-entry-content'>
            <div v-if='subraces.length === 0'>None</div>
            <ul v-else class='list'>
              <li v-for='race in subraces' :key='race.name'>
                {{ race.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Traits</div>
          <div class='details-info-entry-content'>
            <div v-if='traits.length === 0'>None</div>
            <ul v-else class='list'>
              <li v-for='trait in traits' :key='trait.name'>
                {{ trait.name }}
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

export default {
  name: 'race_info',
  data() {
    return {
      error: false,
      race: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/races', { name: this.$route.params.race })
      .then((response) => {
        this.race = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    ability_score(score) {
      if (score) return `+${score}`;
      return score;
    },
  },
  computed: {
    lang_options() {
      return _.sortBy(this.race.language_options.from, ['name']);
    },

    languages() {
      return _.sortBy(this.race.languages, ['name']);
    },

    proficiency_options() {
      return _.sortBy(this.race.starting_proficiency_options.from, ['name']);
    },

    starting_proficiencies() {
      return _.sortBy(this.race.starting_proficiencies, ['name']);
    },

    subraces() {
      return _.sortBy(this.race.subraces, ['name']);
    },

    traits() {
      return _.sortBy(this.race.traits, ['name']);
    },
  },
};
</script>
