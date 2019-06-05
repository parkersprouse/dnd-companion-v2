import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';

import 'vuetify/dist/vuetify.min.css';
import './assets/styles.scss';

import { bus, events } from './lib/EventBus';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  iconfont: 'fa',
  icons: {
    'clear': 'fa-times',
  },
});

Vue.prototype.$event_bus = bus;
Vue.prototype.$events = events;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
