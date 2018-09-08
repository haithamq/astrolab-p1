<template>
  <v-app>
    <v-progress-linear v-if="!ready" style="margin: 0" :indeterminate="true"></v-progress-linear>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken4
  }
});

export default {
  data() {
    return {
      ready: false
    };
  },
  async beforeCreate() {
    await this.$store.dispatch('auth/init');
    this.ready = true;
  }
};
</script>
