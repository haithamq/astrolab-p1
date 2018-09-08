import Vue from 'vue';
import VueApollo from 'vue-apollo';
import AWSAppSyncClient from 'aws-appsync';
import aws_exports from './aws-exports';
import store from './store';

Vue.use(VueApollo);

// Setup AppSync
const client = new AWSAppSyncClient(
  {
    url: aws_exports.aws_appsync_graphqlEndpoint,
    region: aws_exports.aws_appsync_region,
    auth: {
      type: aws_exports.aws_appsync_authenticationType,
      jwtToken: async () =>
        (await Auth.currentSession()).getAccessToken().getJwtToken()
    }
  },
  {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  }
);

const appsyncProvider = new VueApollo({
  defaultClient: client
});

export { client };
export default appsyncProvider;
