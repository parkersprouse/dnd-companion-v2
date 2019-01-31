<template>
  <div>
    <main-navbar />
    <div class='container'>
      <div class='page-header'>
        <h1>My Characters</h1>
      </div>
      <div class='flex-row list-container'>
        <uiv-alert type='danger' v-if='chars_err'>
          <span v-html='feather.icons["alert-octagon"].toSvg()'></span> Failed to get your characters
        </uiv-alert>
        <div class='empty-notice' v-else-if='chars && chars.length === 0'>
          You have no characters
        </div>
        <div class='flex-column' v-for='char in chars' :key='char.id' v-else>
          <char-card :char='char' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
import CharactersListCard from '../../components/characters/CharactersListCard.vue';

export default {
  name: 'my-characters',
  components: {
    'char-card': CharactersListCard,
  },
  data() {
    return {
      feather,
      chars: null,
      chars_err: false,
    };
  },
  mounted() {
    this.$http.get('/api/characters/me')
      .then((response) => {
        this.chars = response.data.content;
      })
      .catch(() => {
        this.chars_err = true;
      });
  },
};
</script>
