import React, { Component } from 'react';

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