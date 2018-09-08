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
  <div id="a-forgot-password">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Forgot password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-if="!codeSent" id="email" prepend-icon="mail" label="Email" v-model="email" type="email" placeholder="Email" autofocus></v-text-field>
          <v-text-field v-if="codeSent" id="code" prepend-icon="confirmation_number" label="Code" v-model="code" type="text" placeholder="Code"></v-text-field>
          <v-text-field v-if="codeSent" id="password" prepend-icon="lock" label="Password" v-model="password" type="password" placeholder="Password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!codeSent" color="primary" v-on:click="send" :disabled="!email || loading" :loading="loading">Send code</v-btn>
        <v-btn v-if="codeSent" color="primary" v-on:click="submit" :disabled="!email || !code || !password || loading" :loading="loading">Change Password</v-btn>
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

const logger = new Logger('ForgotPasswordComp');

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      code: '',
      password: '',
      error: '',
      codeSent: false,
      loading: false
    };
  },
  methods: {
    send: function() {
      this.loading = true;
      Auth.forgotPassword(this.email)
        .then(() => {
          this.codeSent = true;
          logger.debug('code resent');
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    submit: function() {
      this.loading = true;
      Auth.forgotPasswordSubmit(this.email, this.code, this.password)
        .then(() => {
          this.$router.push('/');
          this.loading = false;
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    signIn: function() {
      this.$router.push('/auth/signIn');
    },
    setError: function(err) {
      this.error = err.message || err;
    }
  }
};
</script>
