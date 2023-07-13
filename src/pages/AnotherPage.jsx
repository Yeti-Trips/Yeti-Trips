import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addId } from '../reducers/userReducers.js';

const AnotherPage = () => {

  const stateID = useSelector(state => state.user.idCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('time to try')
        const response = await fetch('http://localhost:3000/server/oauth/login/success', {
          method: 'GET',
          credentials: 'include' // Include credentials (cookies) in the request
        });
        if (response.ok) {
          const data = await response.json();
          console.log('data: ', data )
          console.log('data.user: ', data.user);
          const user = data.user;
          console.log('user: ', user);
          // Dispatch an action to update the Redux store with the user information
          dispatch(addId(user.id));
        } else {
          // Handle error if the response status is not OK
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        // Handle any network or other errors
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div>
      {stateID}
      This is a test page
    </div>
  );
};

export default AnotherPage;