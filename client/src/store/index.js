/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    character: null,
    current_user: null,
  },
  mutations: {
    setCharacter(state, char) {
      state.character = char;
    },
    setCurrentUser(state, user) {
      state.current_user = user;
    },
    updateAttribute(state, payload) {
      state[payload.obj][payload.attribute] = payload.value;
    },
  },
});
