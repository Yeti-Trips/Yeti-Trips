import React from 'react';

export default function ChangePassword(props) {
    return (props.trigger) ? (
        <div>
            <div>
                <br /> <br />
                <label htmlFor="updatePassword">Change Password: </label>
                <input type="text" id="updatePassword" name="updatePassword" />
                <br /><br />
                <button>Save</button>
                <button>Cancel</button>
                { props.children }
                <br /> <br />
            </div>
        </div>
    ) : "";
}