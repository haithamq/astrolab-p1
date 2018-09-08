<template>
  <div id="app-layout">
    <v-navigation-drawer :mini-variant="$vuetify.breakpoint.smAndDown || !drawer"
      permanent
      fixed
      app
      style="padding-top: 50px">
      <v-list dense>
        <v-list-tile v-for="item in menuItems"
          :key="item.text"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary"
      dark
      dense
      fixed
      clipped-left
      app>
      <v-toolbar-title style="width: 300px"
        class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-and-down">
         Easy Lend</span>
      </v-toolbar-title>
      <v-text-field flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-md-and-down"></v-text-field>
      <v-spacer></v-spacer>
      <v-menu bottom
        offset-y>
        <v-btn small
          depressed
          slot="activator"
          light>{{currentLang.label}}</v-btn>
        <v-list dense>
          <v-list-tile @click="setLanguage('en')">
            <v-list-tile-title>English</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="setLanguage('ar')">
            <v-list-tile-title>العربية</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>date_range</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>forum</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <span class="hidden-sm-and-down"
        v-if="user">Welcome back {{user.firstName || user.email}}</span>
      <v-menu bottom
        left
        offset-y>
        <v-btn slot="activator"
          icon
          dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile @click="signOut">
            <v-list-tile-title>
              <v-icon>exit_to_app</v-icon> Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content fill-height>
      <slot name="content"></slot>
    </v-content>
  </div>
</template>

<script>
import { Auth, Logger, JS } from 'aws-amplify';
import { mapGetters, mapMutations } from 'vuex';

const logger = new Logger('_AppLayout');

export default {
  data() {
    return {
      me: false,
      drawer: false,
      menuItems: [
        { icon: 'home', text: 'Home', path: '/' },
        { icon: 'account_circle', text: 'Profile', path: '/profile' },
        { icon: 'business', text: 'My Business', path: '/business' },
        { icon: 'event', text: 'Events', path: '/events' },
        { icon: 'group', text: 'Groups', path: '/groups' },
        { icon: 'bubble_chart', text: 'Services', path: '/services' }
      ]
    };
  },
  computed: {
    ...mapGetters({
      currentLang: 'currentLang',
      user: 'user'
    })
  },
  methods: {
    ...mapMutations(['setLanguage']),
    signOut: function(event) {
      Auth.signOut()
        .then(() => {
          logger.debug('sign out success');
          this.$router.push('/auth/signIn');
        })
        .catch(err => logger.error(err));
    }
  }
};
</script>

