<template>
  <v-card tile>
    <v-list-tile-avatar size="60">
      <img :src="require('../../../assets/icon.png')">
    </v-list-tile-avatar>
    <v-card-text>
      <div>{{ client.name }}</div>
      <div>Has: nissan and toyota</div>
      <div>mobile: {{client.mobile}} </div>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="orange" @click.stop="dialog = true">Share</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    client: Object,
  },
};
</script>

