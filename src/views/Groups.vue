<template>
  <AppLayout>
    <v-layout align-center justify-center slot="content">
      <v-flex xs12 sm8 md4>
        <h1>Groups</h1>
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