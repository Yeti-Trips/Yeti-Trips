import React, { Component } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

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