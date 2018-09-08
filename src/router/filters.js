import { Logger } from 'aws-amplify';
import store from '~/store';

const logger = new Logger('RouteFilters');

const authMiddleware = (to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  const loaded = store.getters['auth/loaded'];
  const isNewUser = store.getters['isNewUser'];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthPath = to.name.includes('auth');

  logger.debug('loaded', loaded);
  logger.debug('requiresAuth', requiresAuth);
  logger.debug('isLoggedIn', isLoggedIn);
  logger.debug('isNewUser', isNewUser);
  logger.debug('isAuthPath', isAuthPath);

  if (requiresAuth) {
    // redirect to auth if not authenticated
    if (!isLoggedIn) {
      next();
      // return next({ name: 'auth_SignIn' });
    }

    // if (!isNewUser && to.name === 'onboarding') {
    //   return next({ name: 'home' });
    // }

    // is it a new user?
    if (isLoggedIn && isNewUser) {
      // is already going to onboarding?
      if (to.name === 'onboarding') {
        return next(); // let it go
      } else {
        return next({ name: 'onboarding' }); // take him to onboarding
      }
    }

    // regular loggedIn
    if (isLoggedIn) {
      return next();
    }
  } else if (isAuthPath && isLoggedIn) {
    // is it trying to access auth paths?
    return next({ name: 'home' });
  } else {
    // proceed normally
    return next();
  }
};

export const authFilter = (to, from, next) => {
  logger.debug(`authFilter from ${from.name} to ${to.name}`);
  // next();
  // check if the auth store is loaded
  let authLoaded = store.getters['auth/loaded'];
  logger.debug('authLoaded', authLoaded);
  if (!authLoaded) {
    logger.debug('watching auth/loaded');
    const unwatch = store.watch(
      (state, getters) => getters['auth/loaded'],
      loaded => {
        logger.debug('watch - auth/loaded', loaded);
        if (loaded) {
          unwatch();
          authMiddleware(to, from, next);
        }
      }
    );
  } else {
    // proceed with logic
    authMiddleware(to, from, next);
  }
};
