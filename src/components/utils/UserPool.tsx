import {CognitoUserPool} from 'amazon-cognito-identity-js' 
const poolData = {
    UserPoolId: 'user-pool-id',
    ClientId: 'client-id'
}

export default new CognitoUserPool(poolData);