import React from "react";

export default function ChangeAvatar(props) {
    return (props.trigger) ? (
        <div>
            <div>
                <br /> <br />
                <label htmlFor="uploadAvatar">Upload Image: </label>
                <input type="file" id="uploadAvatar" name="uploadAvatar" /> 
                <br /><br />
                <button>Save</button>
                <button>Cancel</button>
                { props.children }
                <br /> <br />
            </div>
        </div>
    ) : "";
}