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
  getters: {
    logged_in(state) {
      return !!state.current_user && !!state.current_user.id;
    },
  },
  mutations: {
    setState(state, { name, value }) {
      state[name] = value;
    },

    updateAttribute(state, payload) {
      state[payload.obj][payload.attribute] = payload.value;
    },
  },
});
