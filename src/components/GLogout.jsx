import React, { Component } from 'react';
import { googleLogout } from '@react-oauth/google';

const clientID = "675806936485-hnn3n904n9ofgg9pqg599oqnn1ja2f5r.apps.googleusercontent.com";

function GLogout() {
  
  const onSuccess = () => {
    console.log('Logout made successfully');
  };

  const logout = () => {
    googleLogout();
  };
  //{clientId: clientID, onLogoutSuccess: onSuccess}
  return (
    <div id="google-logout-button">
      <button onClick={logout}>Logout</button>
    </div>
  )
};

export default GLogout;

/*
<googleLogout
      buttonText={"Logout"}
      onLogoutSuccess={onSuccess}
      />
*/