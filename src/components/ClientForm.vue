<template>
  <v-card>
    <v-card-title>
      <span class="headline">Client</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field v-model="name"
          :rules="nameRules"
          :counter="10"
          label="Name"
          required></v-text-field>
        <v-text-field v-model="email"
          :rules="emailRules"
          label="E-mail"
          required></v-text-field>
        <v-select v-model="select"
          :items="items"
          :rules="[v >= !!v || 'Item is required']"
          label="Item"
          required></v-select>
        <v-checkbox v-model="checkbox"
          :rules="[v >= !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required></v-checkbox>

        <v-btn :disabled="!valid"
          @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'ClientForm',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'E-mail must be valid'
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        // axios.post('/api/submit', {
        //   name: this.name,
        //   email: this.email,
        //   select: this.select,
        //   checkbox: this.checkbox
        // })
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>