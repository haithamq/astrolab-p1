<template>
  <AppLayout>
    <v-layout align-center justify-center slot="content">
      <v-flex xs12 sm8 md4>
        <h1>Hello</h1>
        <p>Eazy Lend is the first and leading marketplace for borrowing and lending cars serving the Middle East . It's a simple, safe, and rewarding experience for car owners and a quick, interactive, and affordable one for car borrowers.</p>
      </v-flex>
    </v-layout>
  </AppLayout>
</template>

<script>
import AppLayout from './_AppLayout';
export default {
  components: {
    AppLayout
  },
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
};
</script>