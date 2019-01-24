<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>Create Character</h1>
      </div>

      <div class='panel panel-default single-form-panel'>
        <div class='panel-body'>
          <form @submit.prevent='submit'>
            <uiv-alert type='danger' v-if='error_msg'>
              <span v-html='feather.icons["alert-octagon"].toSvg()'></span> {{ error_msg }}
            </uiv-alert>
            <div class='form-group'>
              <label for='name'>Name <span class='required-label'>*</span></label>
              <div class='input-group'>
                <span class='input-group-addon'><span v-html='feather.icons.tag.toSvg()'></span></span>
                <input type='text' class='form-control' id='name' placeholder='Name' v-model='name' />
              </div>
            </div>
            <div style='text-align: center;'>
              <uiv-btn block :disabled='submitting' native-type='submit' type='primary'>
                <span v-html='feather.icons["check-circle"].toSvg()'></span> Create
              </uiv-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'create-character',
  data() {
    return {
      error_msg: '',
      feather,
      name: '',
      submitting: false,
    };
  },
  methods: {
    submit() {
      this.error_msg = '';
      this.submitting = true;

      this.$http.post('/api/characters', { name: this.name })
        .then((response) => {
          window.location.href = `/characters/${response.data.content}`;
        })
        .catch((error) => {
          this.error_msg = error.response.data.message;
          this.submitting = false;
        });
    },
  },
};
</script>
