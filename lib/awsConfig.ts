import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_7OWUtvW8C',
    userPoolWebClientId: '2ce5imafibumlqcqsd21fj6ov4',
  },
};

Amplify.configure(amplifyConfig);
