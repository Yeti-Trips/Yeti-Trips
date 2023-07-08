import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

const AnotherPage = () => {

  const stateID = useSelector(state => state.user.idCount);
  const dispatch = useDispatch();

  return (
    <div>
      {stateID}
      This is a test page
    </div>
  );
};

export default AnotherPage;