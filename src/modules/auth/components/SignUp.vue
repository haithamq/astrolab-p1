/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

<template>
  <div id="a-signup">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Sign Up</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field id="email" prepend-icon="mail" name="email" label="Email" type="email" v-model="email" placeholder="Email" autofocus></v-text-field>
          <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" placeholder="Password"></v-text-field>
          <v-text-field id="phone" prepend-icon="local_phone" name="phone_number" label="Phone" type="tel" v-model="phone_number" placeholder="Phone"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="signUp" :disabled="!email || !password || loading" :loading="loading">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
    <v-layout align-start>
      <v-btn flat small color="primary" @click="signIn">Sign In</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat small color="primary" @click="confirm">Confirm Code</v-btn>
    </v-layout>
    <v-alert :value="error" type="error" transition="scale-transition" dismissible>
      {{error}}
    </v-alert>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('SignUpComp');

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      phone_number: '',
      error: '',
      loading: false
    };
  },
  methods: {
    signUp: function(event) {
      this.loading = true;
      Auth.signUp({
        username: this.email,
        password: this.password,
        phone_number: this.phone_number
      })
        .then(data => {
          logger.debug('sign up success', data);
          this.$router.push(`/auth/confirmSignUp?email=${this.email}`);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          logger.error('sign up error', err);
          this.loading = false;
        });
    },
    signIn: function() {
      this.$router.push('/auth/signIn');
    },
    confirm: function() {
      this.$router.push('/auth/confirmSignUp');
    },
    setError: function(err) {
      this.error = err.message || err;
    }
  }
};
</script>
