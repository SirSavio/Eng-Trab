import Vue from 'vue';
import Vuex from 'vuex';

import Login from './modules/Login';
import User from './modules/User';

Vue.use(Vuex);

const modules = {
  Login,
  User
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules
});