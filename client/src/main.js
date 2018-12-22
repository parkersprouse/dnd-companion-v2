import './assets/css/bootstrap.min.css';
import './assets/css/styles.scss';

import Vue from 'vue';
import axios from 'axios';

import NumberInput from './components/NumberInput.vue';
import App from './App.vue';
import router from './router';
import { bus } from './lib/EventBus';

Vue.component('number-input', NumberInput);
Vue.prototype.$events = bus;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
