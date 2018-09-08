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

import * as Components from './components';
import Auth from './Auth';

const AuthRouter = {
  path: '/auth',
  name: 'auth',
  component: Auth,
  children: [
    {
      path: 'signIn',
      name: 'auth_SignIn',
      component: Components.SignIn,
      props: route => ({ emailParam: route.query.email })
    },
    {
      path: 'signUp',
      name: 'auth_SignUp',
      component: Components.SignUp
    },
    {
      path: 'confirmSignUp',
      name: 'auth_ConfirmSignUp',
      component: Components.ConfirmSignUp,
      props: route => ({ emailParam: route.query.email })
    },
    {
      path: 'forgotPassword',
      name: 'auth_ForgotPassword',
      component: Components.ForgotPassword
    }
  ]
};

export default AuthRouter;
