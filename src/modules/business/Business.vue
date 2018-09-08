<template>
  <AppLayout>
    <v-container style="height: calc(100vh - 48px);"
      slot="content"
      fluid
      fill-height>

      <!-- Add Business View -->
      <v-layout v-if="!business"
        align-center
        justify-center
        row
        fill-height>
        <v-btn outline
          @click="dialog = true;">Add Business</v-btn>
        <v-dialog v-model="dialog"
          max-width="500">
          <business-form @submit="createBusiness"
            @cancel="dialog = false"></business-form>
        </v-dialog>
      </v-layout>
      <!-- End Add Business View -->

      <!-- Have a business view -->
      <v-layout v-if="business"
        column>
        <v-toolbar color="white"
          tabs
          flat>
          <v-toolbar-title>
            <v-icon large>business</v-icon>
            {{business.name}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu offset-y>
            <v-btn slot="activator"
              outline
              color="primary">
              Create
            </v-btn>
            <v-list dense>
              <v-list-tile @click="dialog = true; action = 'create-client'">
                <v-list-tile-title>
                  <v-icon>group</v-icon>
                  Client
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="dialog = true; action = 'create-reacord'">
                <v-list-tile-title>
                  <v-icon>assignment</v-icon>
                  Reacord
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <v-btn icon
              slot="activator">
              <v-icon>settings</v-icon>
            </v-btn>
            <v-list dense>
              <v-list-tile @click="deleteBusiness">
                <v-list-tile-title>
                  <v-icon>delete</v-icon>
                  Delete
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-tabs slot="extension"
          icons-and-text>
          <v-tab v-for="tab in tabs"
            :key="tab.path"
            :to="`/business${tab.path}`">
            {{ tab.label }}
            <v-icon>{{tab.icon}}</v-icon>
          </v-tab>
        </v-tabs>
        <router-view></router-view>
        <v-dialog v-model="dialog"
          max-width="500">
          <client-form v-if="action === 'create-client'"></client-form>
          <reacord-form v-if="action === 'create-reacord'"></reacord-form>
        </v-dialog>
      </v-layout>
      <!-- End Have a business view -->
    </v-container>
  </AppLayout>
</template>


<script>
import uuid from 'uuid/v4';
import { get, pickBy } from 'lodash-es';
import AppLayout from '~/views/_AppLayout';
import BusinessForm from '~/components/BusinessForm.vue';
import ClientForm from '~/components/ClientForm.vue';
import ReacordForm from './components/ReacordForm.vue';
import {
  MY_BUSINESS_QUERY,
  CREATE_BUSINESS_MUTATION,
  DELETE_BUSINESS_MUTATION
} from '~/graphql';

export default {
  name: 'BusinessView',

  apollo: {
    me: MY_BUSINESS_QUERY
  },

  data: () => ({
    dialog: false,
    action: '',
    me: null,
    tabs: [
      {
        label: 'Clients',
        path: '/clients',
        icon: 'group'
      },
      {
        label: 'Reacords',
        path: '/reacords',
        icon: 'assignment'
      },
      {
        label: 'Reaports',
        path: '/reaports',
        icon: 'show_chart'
      }
    ]
  }),

  computed: {
    business() {
      return get(this.me, 'business');
    }
  },

  methods: {
    createBusiness(data) {
      const business = data;
      business.id = uuid();

      this.$apollo
        .mutate({
          mutation: CREATE_BUSINESS_MUTATION,
          variables: pickBy(business),
          optimisticResponse: {
            createBusiness: {
              __typename: 'Business',
              ...business
            }
          },
          update: (store, { data: { newTag } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: MY_BUSINESS_QUERY });
            // Add our tag from the mutation to the end
            data.me.business = {
              __typename: 'Business',
              ...business
            };
            // Write our data back to the cache.
            store.writeQuery({ query: MY_BUSINESS_QUERY, data });
          }
        })
        .then(res => {
          this.dialog = false;
        })
        .catch(err => {
          alert(err.meessage);
          console.log(err);
        });
    },
    deleteBusiness() {
      const { id } = this.business;

      this.$apollo.mutate({
        mutation: DELETE_BUSINESS_MUTATION,
        variables: { id },
        optimisticResponse: {
          deleteBusiness: {
            __typename: 'Business',
            id
          }
        },
        update: (store, { data: { newTag } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: MY_BUSINESS_QUERY });
          // Add our tag from the mutation to the end
          data.me.business = null;
          // Write our data back to the cache.
          store.writeQuery({ query: MY_BUSINESS_QUERY, data });
        }
      });
    }
  },

  created() {
    const query = this.$router.currentRoute.query;
    if (query.action === 'add') {
      this.dialog = true;
    }
  },

  watch: {
    business(newBusinessVal, oldBusinessVal) {
      if (
        !oldBusinessVal &&
        newBusinessVal &&
        this.$route.name === 'business'
      ) {
        this.$router.push('/business/clients');
      }
    }
  },

  components: {
    AppLayout,
    BusinessForm,
    ClientForm,
    ReacordForm
  }
};
</script>
