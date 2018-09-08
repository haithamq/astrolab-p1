<template>
  <form>
    <v-card>
      <v-card-title>
        <span class="headline">Business Form</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="form.name"
          name="name"
          label="Name"
          placeholder="Name"
          v-validate="rules.name"
          :error-messages="errors.collect('name')"></v-text-field>
        <v-text-field v-model="form.email"
          name="email"
          label="E-mail"
          placeholder="E-mail"
          v-validate="rules.email"
          :error-messages="errors.collect('email')"></v-text-field>
        <v-text-field v-model="form.website"
          name="website"
          label="Website"
          placeholder="website"
          v-validate="rules.website"
          :error-messages="errors.collect('website')"></v-text-field>
        <v-text-field v-model="form.bio"
          name="bio"
          label="bio"
          placeholder="bio"></v-text-field>
        <v-text-field v-model="form.phone"
          name="phone"
          label="phone"
          placeholder="phone"
          v-validate="rules.phone"
          :error-messages="errors.collect('phone')"></v-text-field>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"
          flat
          @click="clear">cancel</v-btn>
        <v-btn type="submit"
          color="primary"
          :disabled="errors.any()"
          @click.prevent="submit">
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
export default {
  data: () => ({
    form: {
      name: '',
      email: '',
      website: '',
      bio: '',
      phone: ''
    },
    rules: {
      name: 'required',
      email: 'required|email',
      website: 'url',
      phone: 'numeric|max:14'
    }
  }),

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          // emit the submit event
          this.$emit('submit', this.form);
          // reset validation
          this.$validator.reset();
          // reset form state, should wait until operation is complete
          // this.form = {};
        }
      });
    },
    clear() {
      // emit the cancel event
      this.$emit('cancel');
      // reset validation
      this.$validator.reset();
      // reset form state
      // this.form = {};
    }
  },
  deactivated() {
    console.log('destroyed', this.form);
  }
};
</script>
