import React from 'react';

export default function ChangeEmail(props) {
    return (props.trigger) ? (
        <div>
            <div>
                <br /> <br />
                <label htmlFor="updateEmail">Update Email: </label>
                <input type="text" id="updateEmail" name="updateEmail"></input>
                <br /> <br />
                <button>Save</button>
                <button className="close-button">Cancel</button>
                { props.children }
                <br /> <br />
            </div>
        </div>
    ) : "";
}

