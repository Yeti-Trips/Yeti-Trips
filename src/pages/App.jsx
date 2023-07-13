import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

import Login from '../components/Login.jsx';
import ProfileSettings from './ProfileSettings.jsx';

const App = () => {
  return (
    <div className="mainApp">
      <ProfileSettings />
      <Login />
    </div>
  );
};

export default App;