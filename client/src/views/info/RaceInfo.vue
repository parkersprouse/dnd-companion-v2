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
          <div class='details-info-entry-title'>Size</div>
          <div class='details-info-entry-content'>
            <div>{{ race.size }}</div>
            <div>{{ race.size_description }}</div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Alignment</div>
          <div class='details-info-entry-content'>
            <div>{{ race.alignment }}</div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Age</div>
          <div class='details-info-entry-content'>
            <div>{{ race.age }}</div>
          </div>
        </div>
      </div>

      <div class='details-info-row thirds'>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Languages</div>
          <div class='details-info-entry-content'>
            <div v-if='race.languages.length === 0'>None</div>
            <div>{{ default_languages }}</div>
            <div>{{ race.language_desc }}</div>
            <div v-if='race.language_options.from'>
              <div>Select {{ race.language_options.choose }} from:</div>
              <div v-for='race in race.language_options.from'>
                {{ race.name }}
              </div>
            </div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Traits</div>
          <div class='details-info-entry-content'>
            <div v-if='race.traits.length === 0'>None</div>
            <div v-for='trait in race.traits'>{{ trait.name }}</div>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Subraces</div>
          <div class='details-info-entry-content'>
            <div v-if='race.subraces.length === 0'>None</div>
            <div v-for='race in race.subraces'>{{ race.name }}</div>
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
  computed: {
    default_languages() {
      return _.join(_.map(this.race.languages, l => l.name), ', ');
    },
  },
};
</script>
