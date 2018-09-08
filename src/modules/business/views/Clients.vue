<template>
  <v-container fluid grid-list-lg class="px-0">
    <v-layout row wrap>
      <v-flex xs12 md6 v-for="client in clients" :key="client.id">
        <client-card  :client="client"></client-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import ClientCard from '../components/ClientCard.vue';

export default {
  name: 'Business-Clients',
  components: {
    ClientCard,
  },
  data() {
    return {
      dialog: false,
      clients: [
        {
          id: '123123123',
          name: 'Haitham Qudaih',
          image: require('../../../assets/icon.png'),
          cars: ['lexsus', 'ford'],
          mobile: '1112222333',
        },
        {
          id: '232323232',
          name: 'Haitham Qudaih 2',
          image: require('../../../assets/icon.png'),
          cars: ['nisssan', 'toyota'],
          mobile: '1112222333',
        },
      ],
    };
  },
};
</script>
