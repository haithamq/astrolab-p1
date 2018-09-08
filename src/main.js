import Vue from 'vue';
import Amplify from 'aws-amplify';
import VeeValidate from 'vee-validate';

//Config
import aws_exports from './aws-exports';
// Vue setup
import App from './App.vue';
import router from './router';
import store from './store';
import appsync from './appsync';

// Styles
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Amplify.configure(aws_exports);

if (process.env.NODE_ENV === 'development') {
  Vue.config.productionTip = false;
  Amplify.Logger.LOG_LEVEL = 'DEBUG'; // to show detailed logs from Amplify library
}

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  provide: appsync.provide(),
  render: h => h(App)
}).$mount('#app');
