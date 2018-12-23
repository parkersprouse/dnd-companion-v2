import './assets/css/bootstrap.min.css';
import './assets/css/styles.scss';

import axios from 'axios';
import Vue from 'vue';
import * as uiv from 'uiv';

import MainNavbar from './components/MainNavbar.vue';
import NumberInput from './components/NumberInput.vue';
import App from './App.vue';
import router from './router';
import { bus } from './lib/EventBus';
import store from './store';

Vue.use(uiv, { prefix: 'uiv' });

Vue.component('main-navbar', MainNavbar);
Vue.component('number-input', NumberInput);
Vue.prototype.$events = bus;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
