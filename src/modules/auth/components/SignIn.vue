<template>
  <div id="a-signin">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Sign In</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field id="email" prepend-icon="mail" name="email" label="Email" type="email" v-model="email" placeholder="Email" autofocus v-on:keyup.enter="signIn"></v-text-field>
          <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" placeholder="Password" v-on:keyup.enter="signIn"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" v-on:click="signIn" :disabled="!email || !password || loading" :loading="loading">Sign In</v-btn>
      </v-card-actions>
    </v-card>
    <v-layout align-start>
      <v-btn flat small color="primary" @click="signUp">Sign Up</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat small color="primary" @click="forgot">Forgot Password</v-btn>
    </v-layout>
    <v-alert :value="error" type="error" transition="scale-transition" dismissible>
      {{error}}
    </v-alert>
  </div>
</template>

<script>
import { Auth, Logger, JS } from 'aws-amplify';
import { mapMutations } from 'vuex';

const logger = new Logger('SignInComp');

export default {
  name: 'SignIn',
  data() {
    return {
      email: this.emailParam || '',
      password: '',

      user: null,
      code: '',

      error: '',
      loading: false
    };
  },
  props: ['emailParam'],
  methods: {
    signIn: function(event) {
      const that = this;
      this.loading = true;
      Auth.signIn(this.email, this.password)
        .then(user => {
          logger.debug('sign in success', user);
          return user;
        })
        .then(user => {
          that.user = user;
          this.checkUser();
        })
        .catch(err => {
          this.setError(err);
          this.loading = false;
        });
    },
    async checkUser() {
      const user = this.user;
      if (!user) {
        this.loading = false;
        return;
      }

      Auth.verifiedContact(user).then(async data => {
        logger.debug('verify result', data);
        if (!JS.isEmpty(data.verified)) {
          await this.$store.dispatch('auth/init');
          this.$router.push('/');
        } else {
          logger.error('user not verified');
        }

        this.loading = false;
      });
    },
    confirm: function() {
      Auth.confirmSignIn(this.user, this.code)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => this.setError(err));
    },
    forgot: function() {
      this.$router.push('/auth/forgotPassword');
    },
    signUp: function() {
      this.$router.push('/auth/signUp');
    },
    setError: function(err) {
      this.error = err.message || err;
    }
  }
};
</script>
