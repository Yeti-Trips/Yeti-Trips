import React from 'react';

export default function ChangeEmail() {
    return (
        <div>
            <label htmlFor="updateEmail">Update Email: </label>
            <input type="text" id="updateEmail" name="updateEmail"></input>
            <br /> <br />
            <button>Save</button>
            <button>Cancel</button>
        </div>
    )
}

