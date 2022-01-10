import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { AccountContext } from "../../providers/AccountProvider";
import Login from "./Login";
import SignUp from "./SignUp";



type hideFn = () => void;
export enum AuthType{
  SIGNUP = "SIGNUP",
  LOGIN = "LOGIN"
}
export enum RegistrationType{
  STUDENT = "STUDENT",
  COMPANY = "COMPANY"
}

interface modalProps{
  show: boolean,
  type: AuthType,
  registration_type: RegistrationType,
  onHide: hideFn
}


function AuthModal(props: modalProps) {
  const {authenticationSucceded, signupSucceded, googleSignIn, userId} = useContext(AccountContext);

  const responseSuccessGoogle = (googleUser: any) => {
    googleSignIn?.(googleUser);
  }

  const responseErrorGoogle = (response: any) => {

  }

  useEffect(()=>{
    if(authenticationSucceded){
      console.log("auth succeded")
      props.onHide()
    }
  },[authenticationSucceded])
  
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      {signupSucceded ? 
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Succesful registration!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="success">
                <p>You have succesfully signed up! Please check your email in order to confirm and complete your registration.</p>
            </Alert>
          </Modal.Body>
        </div> :
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Log in to your account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GoogleLogin
              clientId="673355733676-g73gk526e14s22mnsg08fu4sf57ntkhv.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <hr/>
            {props.type == AuthType.SIGNUP ?  <SignUp type={props.registration_type}/> : <Login/> }
          </Modal.Body>
        </div>
      }
    </Modal>
  );
}

export default AuthModal;