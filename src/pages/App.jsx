import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GLogin from '../components/gLogin.jsx';
import GLogout from '../components/gLogout.jsx';
import { addId } from '../reducers/userReducers.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Login from '../components/Login.jsx';

const App = () => {

  const stateID = useSelector(state => state.user.idCount);
  const dispatch = useDispatch();

  return (
    <div className="mainApp">
      <Login />
      {stateID}
      <button onClick = {() => {dispatch(addId())}}>
        Update Count
      </button>
    </div>
  );
};

export default App;