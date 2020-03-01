import Vue from 'vue';
import axios from 'axios';
import Popper from 'vue-popperjs';
import cookies from 'js-cookie';
import VueSelect from 'vue-select';

import 'vue-popperjs/dist/vue-popper.css';
import 'vue-select/dist/vue-select.css';
import './assets/styles.scss';

import bus from './lib/EventBus';
import App from './App.vue';
import Alert from './components/Alert.vue';
import Loader from './components/Loader.vue';
import router from './router';
import store from './store';

Vue.prototype.$cookies = cookies;
Vue.prototype.$event_bus = bus;
Vue.prototype.$http = axios;

Vue.component('alert', Alert);
Vue.component('loader', Loader);
Vue.component('popper', Popper);
Vue.component('v-select', VueSelect);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
