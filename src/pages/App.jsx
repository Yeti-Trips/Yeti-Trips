import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GLogin from '../components/gLogin.jsx';
import GLogout from '../components/gLogout.jsx';
import { addId } from '../reducers/userReducers.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {

  const stateID = useSelector(state => state.user.idCount);
  const dispatch = useDispatch();

  return (
    <div className="mainApp">
      {stateID}
      <button onClick = {() => {dispatch(addId())}}>
        Update Count
      </button>
      <GLogin />
      <GLogout />
    </div>
  );
};

export default App;