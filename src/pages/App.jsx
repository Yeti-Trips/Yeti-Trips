import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

const App = () => {

  const stateID = useSelector(state => state.user.idCount);
  const dispatch = useDispatch();

  return (
    <div className="mainApp">
      {stateID}
      <button onClick = {() => {dispatch(addId())}}>
        Update Count
      </button>
    </div>
  );
};

export default App;