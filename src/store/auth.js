import { Auth, Logger } from 'aws-amplify';
import { get } from 'lodash-es';

window.Auth = Auth;
const logger = new Logger('AuthStore');

export default {
  namespaced: true,
  state: {
    loaded: false,
    loading: false,
    user: null
  },
  getters: {
    isLoggedIn: state => !!state.user,
    user: state => state.user,
    username: state => get(state, 'user.username'),
    email: state => get(state, 'user.attributes.email'),
    token: state => get(state, 'user.signInUserSession.accessToken.jwtToken'),
    loaded: state => state.loaded && !state.loading,
    loading: state => state.loading
  },
  actions: {
    init(context) {
      logger.debug('init');
      context.commit('loading', true);
      return Auth.currentAuthenticatedUser()
        .then(async user => {
          logger.debug('...has user', user);
          context.commit('setUser', user);
          await context.dispatch('loadMe', null, { root: true });
          context.commit('loading', false);
          context.commit('loaded');
          return user;
        })
        .catch(err => {
          logger.debug('...no user', err);
          context.commit('setUser', null);
          context.commit('loading', false);
          context.commit('loaded');
        });
    }
  },
  mutations: {
    loading(state, loading) {
      logger.debug('mutations.loading', loading);
      state.loading = loading;
    },
    loaded(state, loaded = true) {
      logger.debug('mutations.loaded');
      state.loaded = loaded;
    },
    setUser(state, user) {
      logger.debug('mutations.setUser', user);
      state.user = user;
    }
  }
};
