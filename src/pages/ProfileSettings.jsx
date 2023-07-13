import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import reducer function
import { changeEmailPopup, changePasswordPopup, changeAvatarPopup, deleteAccountPopup } from '../reducers/userReducers.js';
import Test from '../components/ChangeAvatar.jsx';

export default function ProfileSettings() {

    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password)
    const dispatch = useDispatch();
    const count = password.length;

    return (
        <div className="profileSettings-container">

            <Test />

            <h1>Profile Settings</h1>
            <p>Email: {email}</p>
            <button onClick = {() => {dispatch(changeEmailPopup())}}> Change Email </button>

            <p>Password: {'*'.repeat(count)} </p>
            <button onClick = {() => {dispatch(changePasswordPopup())}}> Change Password </button>
            <br /> <br />

            <img src="#" alt="Profile Avatar" />
            <br /> <br />
            <button onClick = {() => {dispatch(changeAvatarPopup())}}> Change Avatar </button>

            <br /> <br />
            <button onClick = {() => {dispatch(deleteAccountPopup())}}> Delete Account </button> 
        </div>
    )
}
