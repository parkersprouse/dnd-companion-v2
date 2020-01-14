import Vue from 'vue';
import axios from 'axios';
import Popper from 'vue-popperjs';

import 'vue-popperjs/dist/vue-popper.css';
import './assets/styles.scss';

import bus from './lib/EventBus';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$event_bus = bus;
Vue.prototype.$http = axios;

Vue.component('popper', Popper);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
