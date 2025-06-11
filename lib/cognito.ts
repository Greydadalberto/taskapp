import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-1_7OWUtvW8C',
  ClientId: '2ce5imafibumlqcqsd21fj6ov4'
};

const userPool = new CognitoUserPool(poolData);

export const authenticateUser = (email: string, password: string): Promise<any> => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
        const groups = payload['cognito:groups'] || [];
        resolve({ idToken, groups });
      },
      onFailure: (err) => reject(err),
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // You can auto-set a new password here for first login or prompt the user
        const newPassword = prompt('New password required. Enter new password:') || 'Newpass123!';
        cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
          onSuccess: (result) => {
            const idToken = result.getIdToken().getJwtToken();
            const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
            const groups = payload['cognito:groups'] || [];
            resolve({ idToken, groups });
          },
          onFailure: (err) => reject(err),
        });
      }
    });
  });
};
