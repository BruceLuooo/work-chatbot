import {
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.REACT_APP_COGNITO_REGION,
});
