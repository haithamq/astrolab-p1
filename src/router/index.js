import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '~/views/Home.vue';
import About from '~/views/About.vue';
import Profile from '~/views/Profile.vue';
import Events from '~/views/Events.vue';
import Groups from '~/views/Groups.vue';
import Services from '~/views/Services.vue';
import Onboarding from '~/views/Onboarding.vue';

import { auth, business } from '~/modules';
import { authFilter } from './filters';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: { requiresAuth: true }
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: { requiresAuth: true }
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
      meta: { requiresAuth: true }
    },
    auth.router,
    business.router
  ]
});

router.beforeEach(authFilter);

export default router;
