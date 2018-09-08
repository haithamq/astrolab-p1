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
  <div id="a-confirm-signup">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Confirm Sign Up</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field id="email" prepend-icon="mail" name="email" label="Email" type="email" v-model="email" placeholder="Email" autofocus></v-text-field>
          <v-text-field id="code" prepend-icon="confirmation_number" name="code" label="code" type="text" v-model="code" placeholder="code" autofocus></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn small flat v-on:click="resend" :disabled="!email">Resend</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="confirm" :disabled="!email || !code || loading" :loading="loading">Confirm</v-btn>
      </v-card-actions>
    </v-card>
    <v-layout align-start>
      <v-btn flat small color="primary" @click="signIn">Sign In</v-btn>
    </v-layout>
    <v-alert :value="error" type="error" transition="scale-transition" dismissible>
      {{error}}
    </v-alert>
  </div>
</template>

<script>
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('ConfirmSignUpComp');

export default {
  name: 'SignIn',
  data() {
    return {
      email: this.emailParam || '',
      code: '',
      error: '',
      loading: false
    };
  },
  props: ['emailParam'],
  methods: {
    confirm: function(event) {
      this.loading = true;
      Auth.confirmSignUp(this.email, this.code)
        .then(() => {
          this.$router.push(`/auth/signIn?email=${this.email}`);
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    resend: function() {
      this.loading = true;
      Auth.resendSignUp(this.email)
        .then(() => {
          logger.debug('code resent');
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    signIn: function() {
      this.$router.push(`/auth/signIn?email=${this.email}`);
    },
    setError: function(err) {
      this.error = err.message || err;
    }
  }
};
</script>
