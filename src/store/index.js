import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import language from './language';
import user from './user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    language,
    user
  }
});
