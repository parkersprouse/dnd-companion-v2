/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    character: null,
    user: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    },
    setCharacter(state, char) {
      state.character = char;
    }
  },
});
