import React, {  useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import Pool from '../components/utils/UserPool';
import { Auth } from 'aws-amplify';

type AuthFn = (Username: any, Password: any, Confirmation?: any) => Promise<any>;
type SignUpFn = (Email: any, Password: any) => Promise<any>;
type SignInGoogleFn = (GoogleUser: any) => Promise<any>;
type GetCurrentUserFn = () => Promise<any>;

interface AccountState{
   authenticate?: AuthFn,
   signup?: SignUpFn,
   googleSignIn?: SignInGoogleFn,
   getUser?: GetCurrentUserFn,
   authenticated: boolean,
   userId: string | null,
   confirmationCode:  string | null,
   authenticationError: any | null,
   signupError: any | null,
   authenticationSucceded:  boolean | null,
   signupSucceded: boolean | null,
}

const initialState: AccountState = {
    authenticated: false,
    userId: null,
    confirmationCode:  null,
    authenticationError: null,
    signupError: null,
    authenticationSucceded:  null,
    signupSucceded:  null,
  
}

interface ActionProps{
    type: string,
    payload?: any,  
    
}

const AUTH_FAILED_ERROR = 'AUTH_FAILED_ERROR'
const AUTH_SUCCEDED = 'AUTH_SUCCEDED'
const SIGNUP_FAILED = 'SIGNUP_FAILED'
const SIGNUP_SUCCEDED = 'SIGNUP_SUCCEDED'
const NO_AUTHENTICATED_USER = 'NO_AUTH_USER'
const USER_AUTHENTICATED = 'USER_AUTHENTICATED'
const GOOGLE_USER_AUTHENTICATED = 'GOOGLE_USER_AUTHENTICATED'

const reducer: (state: AccountState, action: ActionProps)=> AccountState =
    (state, {type,payload}) => {
        switch(type){
            case AUTH_FAILED_ERROR:
                return {...state, authenticationError: payload.err};
            case AUTH_SUCCEDED:
                return {...state, authenticationSucceded: true, authenticationError: null, authenticated: true, userId: payload.id.replace(":","-")}
            case SIGNUP_SUCCEDED:
                return {...state,signupError: null, signupSucceded: true}
            case USER_AUTHENTICATED:
                return {...state, userId: payload.user.username, authenticated: true}
            case GOOGLE_USER_AUTHENTICATED:
                return {...state, userId: payload.userGoogle.id.replace(":","-"), authenticated: true}
            case NO_AUTHENTICATED_USER:
                return {...state, authenticated: false}
            default:
                return state;
        }
    };
interface AccountProviderProps{
    children: PropTypes.ReactNodeLike,
}
export const AccountContext = React.createContext<AccountState>(initialState);
const AccountProvider: React.FC<AccountProviderProps>=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const {authenticated, userId, confirmationCode, authenticationError, signupError, authenticationSucceded, signupSucceded} = state;

    const authenticate = useCallback<AuthFn>(authCallback,[]);
    const signup = useCallback<SignUpFn>(signupCallback,[]);
    const googleSignIn = useCallback<SignInGoogleFn>(googleSignInCallback,[]);
    const getUser = useCallback<GetCurrentUserFn>(getUserCallback,[]);

    const value= {authenticated, userId, confirmationCode, authenticationError, signupError, authenticationSucceded, signupSucceded,  authenticate, signup, googleSignIn, getUser}
    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );

    async function authCallback(Username:any, Password:any, Confirmation?: any) {
        const user=new CognitoUser({Username,Pool});
        const authDetails = new AuthenticationDetails({Username,Password });
        if(Confirmation){
            user.confirmRegistration(Confirmation, true, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
            });
        }

        user.authenticateUser(authDetails,{
            onSuccess: data => {
                console.log('onSucces:',data);
                const id = Pool.getCurrentUser()?.getUsername();
                dispatch({type:AUTH_SUCCEDED, payload:{id} })
            },

            onFailure: err =>{
                console.error('onFailure:',err);
                dispatch({type: AUTH_FAILED_ERROR,payload:{err} })
            },

            newPasswordRequired: data => {
                console.log('newPasswordRequires:',data);
            }
        });    
       
    }

    async function signupCallback(Email:any, Password: any){
        Pool.signUp(Email,Password,[],[],(err,data) =>{
            if(err){
                dispatch({type: SIGNUP_FAILED,payload:{err} })
            }else{
                console.log("signup",data)
                dispatch({type: SIGNUP_SUCCEDED,payload:{data} })
            }
        });
    }
    
    async function googleSignInCallback(GoogleUser: any){
        const googleResponse = GoogleUser.getAuthResponse();
        const profile = GoogleUser.getBasicProfile();
        const name = profile.getName();
        const email = profile.getEmail();

        Auth.federatedSignIn('google', {
            token: googleResponse.id_token,
            expires_at: googleResponse.expires_at
        }, {email, name})
        .then(response => {  
            const id = response.identityId;
            dispatch({type:AUTH_SUCCEDED , payload:{id}});
            console.log(response); })
        .catch(err => {dispatch({type: AUTH_FAILED_ERROR,payload:{err} });console.log(err);});
    }

    async function getUserCallback(){
        const userGoogle= await Auth.currentAuthenticatedUser().catch(err=>{console.log(err);return null;});
        const user = Pool.getCurrentUser();
        if(user)
            dispatch({type: USER_AUTHENTICATED, payload:{user}})
        else if(userGoogle)
            dispatch({type: GOOGLE_USER_AUTHENTICATED, payload:{userGoogle}})
        else
            dispatch({type: NO_AUTHENTICATED_USER})
    }
}

export default AccountProvider;
    