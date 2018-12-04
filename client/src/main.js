import './assets/css/bootstrap.min.css';
import './assets/css/styles.scss';

import Vue from 'vue';
import NumberInput from './components/NumberInput.vue';
import App from './App.vue';
import router from './router';

Vue.component('number-input', NumberInput);

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
