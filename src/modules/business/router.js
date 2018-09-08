import Business from './Business.vue';
import Clients from './views/Clients.vue';
import Reacords from './views/Reacords.vue';
import Reaports from './views/Reaports.vue';

export default {
  path: '/business',
  name: 'business',
  component: Business,
  meta: { requiresAuth: true },
  children: [
    {
      name: 'business.clients',
      path: 'clients',
      component: Clients
    },
    {
      name: 'business.reacords',
      path: 'reacords',
      component: Reacords
    },
    {
      name: 'business.reaports',
      path: 'reaports',
      component: Reaports
    }
  ]
};
