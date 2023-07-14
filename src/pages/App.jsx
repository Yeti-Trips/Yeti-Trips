import React from "react";
import GroupVacationContainer from '../containers/GroupVacationContainer.jsx';
import VacationContainer from '../containers/VactionContainer.jsx';

import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

import Login from '../components/Login.jsx';

const App = () => {

  return (
    <div className="mainApp">
      <Login />
    </div>
  );
};

export default App;