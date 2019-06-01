<template>
  <v-layout>
    <v-flex sm12 md6 offset-md3 lg4 offset-lg4>
      <v-card>
        <v-card-title primary-title>
          <div style='width: 100%;'>
            <h3 class='headline'>Register</h3>
            <register-form />
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import RegisterForm from '../components/register/RegisterForm.vue';

export default {
  name: 'register',
  components: {
    'register-form': RegisterForm,
  },
};
</script>

<style lang='scss'>

</style>
