<template>
  <div class='flex flex-row flex-wrap items-stretch content-center
              justify-center'>
    <div v-if='show_register' class='box flex-basis-full md:flex-basis-half'>
      <register-form @show_login='show_register = false' />
    </div>
    <div v-else class='box flex-basis-full md:flex-basis-half'>
      <login-form @show_register='show_register = true' />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/index/authenticate_panel/LoginForm.vue';
import RegisterForm from '@/components/index/authenticate_panel/RegisterForm.vue';

export default {
  name: 'authenticate_panel',
  components: {
    'login-form': LoginForm,
    'register-form': RegisterForm,
  },
  data() {
    return {
      show_register: false,
    };
  },
};
</script>
