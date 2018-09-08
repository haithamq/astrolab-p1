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

import { Hub, Logger } from 'aws-amplify';
import router from './router';
import store from '~/store';

const alex = new Logger('AuthListener');

alex.onHubCapsule = capsule => {
  switch (capsule.payload.event) {
    case 'signIn':
      alex.error('user signed in');
      break;
    case 'signUp':
      alex.error('user signed up');
      break;
    case 'signOut':
      alex.error('user signed out');
      store.commit('auth/setUser', null);
      store.commit('setUser', null);
      break;
    case 'signIn_failure':
      alex.error('user sign in failed');
      break;
  }
};

Hub.listen('auth', alex);

export * from './components';

export { router };
