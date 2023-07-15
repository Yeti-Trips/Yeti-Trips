import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChangeEmail from '../components/ChangeEmail.jsx';
import ChangePassword from '../components/ChangePassword.jsx';
import ChangeAvatar from '../components/ChangeAvatar.jsx';
import DeleteAccount from '../components/DeleteAccount.jsx';

//import reducer function
import { changeEmailPopup, changePasswordPopup, changeAvatarPopup, deleteAccountPopup } from '../reducers/userReducers.js';

export default function ProfileSettings() {

    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password);
    const avatar = useSelector(state => state.user.avatar);
    const isChangeEmail = useSelector(state => state.user.isChangeEmail);
    const isChangePassword = useSelector(state => state.user.isChangePassword);
    const isChangeAvatar = useSelector(state => state.user.isChangeAvatar);
    const isDeleteAccount = useSelector(state => state.user.isDeleteAccount);

    const dispatch = useDispatch();
    const count = password.length;

    return (
        <div className="profileSettings-container">

            <h1>Profile Settings</h1>
            <p>Email: {email}</p>
            <button onClick = {() => {dispatch(changeEmailPopup())}}> Change Email </button>
            <ChangeEmail trigger={isChangeEmail}>
            </ChangeEmail>

            <p>Password: {'*'.repeat(count)} </p>
            <button onClick = {() => {dispatch(changePasswordPopup())}}> Change Password </button>
            <ChangePassword trigger={isChangePassword} />
            <br /> <br />

            <img src={avatar} alt="Profile Avatar" />
            <br /> <br />
            <button onClick = {() => {dispatch(changeAvatarPopup())}}> Change Avatar </button>
            <ChangeAvatar trigger={isChangeAvatar} />

            <br /> <br />
            <button onClick = {() => {dispatch(deleteAccountPopup())}}> Delete Account </button> 
            <DeleteAccount trigger={isDeleteAccount} />

        </div>
    )
}
