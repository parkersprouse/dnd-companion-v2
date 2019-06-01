<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div style='width: 100%;'>
            <h3 class="headline mb-0">Login</h3>
            <login-form />
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginForm from '../components/login/LoginForm.vue';

export default {
  name: 'login',
  components: {
    'login-form': LoginForm,
  },
};
</script>

<style lang='scss'>

</style>
