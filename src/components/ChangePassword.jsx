import React from 'react';

export default function ChangePassword() {
    return (
        <div>
            <label htmlFor="updatePassword">Change Password: </label>
            <input type="text" id="updatePassword" name="updatePassword" />
            <br /><br />
            <button>Save</button>
            <button>Cancel</button>
        </div>
    )
}