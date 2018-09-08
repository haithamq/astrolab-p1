<template>
  <AppLayout>
    <div class="about" slot="content">
      <h1>This is an about page</h1>
    </div>
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