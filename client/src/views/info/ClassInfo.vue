<template>
  <div id='info-page'>
    <!-- Error Alert -->
    <v-alert v-if='error' :value='true' type='error'>
      Failed to load class
    </v-alert>

    <!-- Loading Indicator -->
    <div v-else-if='!klass' class='text-xs-center'>
      <v-progress-circular indeterminate :size='70' :width='7'></v-progress-circular>
    </div>

    <div v-else>
      <h1 class='page-title'>{{ klass.name }}</h1>

      <div class='details-info-row thirds'>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Hit Dice</div>
          <div class='details-info-entry-content'>
            d{{ klass.hit_die }}
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Saving Throws</div>
          <div class='details-info-entry-content'>
            <ul class='list'>
              <li v-for='ability in saving_throws' :key='ability.name'>
                {{ ability.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class='details-info-entry'>
          <div class='details-info-entry-title'>Subclasses</div>
          <div class='details-info-entry-content'>
            <div v-if='subclasses.length === 0'>None</div>
            <ul v-else class='list'>
              <li v-for='klass in subclasses' :key='klass.name'>
                <span class='has-popover' @click='showItem(klass.name)' tooltip='View'>
                  {{ klass.name }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class='details-info-row'>
        <div class='details-info-entry one-third'>
          <div class='details-info-entry-title'>Proficiencies</div>
          <div class='details-info-entry-content'>
            <div v-if='proficiencies.length === 0'>None</div>
            <ul v-else class='list'>
              <li v-for='prof in proficiencies' :key='prof.name'>
                {{ prof.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class='details-info-entry two-thirds'>
          <div class='details-info-entry-title'>Proficiency Options</div>
          <div class='details-info-entry-content'>
            <div v-if='!klass.proficiency_choices || klass.proficiency_choices.length === 0'>
              None
            </div>
            <div v-else class='proficiency-list'>
              <div v-for='(category, index) in klass.proficiency_choices' :key='index'>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class='headline'>Choice {{ index + 1 }}</h3>
                      <div class='select-from'>
                        Select {{ klass.proficiency_choices[index].choose }} from:
                      </div>
                      <ul class='list'>
                        <li v-for='prof in klass.proficiency_choices[index].from' :key='prof.name'>
                          {{ prof.name }}
                        </li>
                      </ul>
                    </div>
                  </v-card-title>

                </v-card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='details-info-row'>
        <div class='details-info-entry one-third'>
          <div class='details-info-entry-title'>Starting Equipment</div>
          <div class='details-info-entry-content'>
            <starting-equipment-panel :klass='klass.name' />
          </div>
        </div>
        <div class='details-info-entry two-thirds'>
          <div class='details-info-entry-title'>Starting Equipment Options</div>
          <div class='details-info-entry-content'>
            <starting-equipment-options-panel :klass='klass.name' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import StartingEquipmentPanel from '@/components/info/class/StartingEquipmentPanel.vue';
import StartingEquipmentOptionsPanel from '@/components/info/class/StartingEquipmentOptionsPanel.vue';

export default {
  name: 'class_info',
  components: {
    'starting-equipment-panel': StartingEquipmentPanel,
    'starting-equipment-options-panel': StartingEquipmentOptionsPanel,
  },
  data() {
    return {
      error: false,
      klass: null,
      shown_item: null,
    };
  },
  mounted() {
    this.$http.post('/api/dnd/classes', { name: this.$route.params.class })
      .then((response) => {
        this.klass = response.data.content[0];
      })
      .catch(() => {
        this.error = true;
      });
  },
  methods: {
    showItem(item) {
      console.log(item);
    },
  },
  computed: {
    proficiencies() {
      return _.sortBy(this.klass.proficiencies, ['name']);
    },

    proficiency_options() {
      return _.sortBy(this.klass.proficiency_choices.from, ['name']);
    },

    saving_throws() {
      return _.sortBy(this.klass.saving_throws, ['name']);
    },

    subclasses() {
      return _.sortBy(this.klass.subclasses, ['name']);
    },
  },
};
</script>

<style lang='scss' scoped>
  .headline {
    text-align: center;
    margin-bottom: 1rem;
  }

  .v-card__title {
    padding-top: 0;

    > div {
      width: 100%;
    }
  }
</style>
