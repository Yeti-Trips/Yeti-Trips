import React, { Component } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

// const clientID = "675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com";

function GLogin() {
  const dispatch = useDispatch();

  const onSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    console.log(credentialResponse.credential);
    const userObject = jwt_decode(credentialResponse.credential);
    console.log('userObject: ', userObject);
    
    

  }
  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  }
  return(
    
    <div id="google-login-button">
      <GoogleOAuthProvider clientId ="675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </GoogleOAuthProvider>
    </div>
  )
}

export default GLogin;