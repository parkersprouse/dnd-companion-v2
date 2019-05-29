import Vue from 'vue';
import VueAtlas from 'vue-atlas';
import axios from 'axios';

import 'vue-atlas/dist/vue-atlas.css';
import './assets/styles.scss';

import { bus, events } from './lib/EventBus';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueAtlas, 'en');

Vue.prototype.$event_bus = bus;
Vue.prototype.$events = events;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
