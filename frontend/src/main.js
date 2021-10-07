import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'

import './assets/tailwind.css'
import Particles from "particles.vue";
import { GridGlobal } from 'gridjs-vue'

import BaseLayout from './layouts/BaseLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Particles);
Vue.use(GridGlobal)
Vue.component('default-layout', BaseLayout);
Vue.component('empty-layout', EmptyLayout);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
