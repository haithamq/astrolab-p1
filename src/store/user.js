import { Logger } from 'aws-amplify';
import { client } from '~/appsync';
import { ME_QUERY } from '~/graphql';

const logger = new Logger('UserStore');

export default {
  state: {
    user: null
  },
  getters: {
    isNewUser: state => !state.user,
    user: state => state.user
  },
  actions: {
    loadMe(context) {
      logger.debug('loadMe - start');
      return client
        .query({
          query: ME_QUERY,
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => {
          logger.debug('loadMe - success', data);
          context.commit('setUser', data.me);
        })
        .catch(err => logger.error('loadMe - error', err));
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
};
