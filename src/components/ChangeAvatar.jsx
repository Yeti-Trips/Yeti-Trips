import React from "react";

export default function ChangeAvatar() {
    return (
        <div>
            <label htmlFor="uploadAvatar">Upload Image: </label>
            <input type="file" id="uploadAvatar" name="uploadAvatar" /> 
            <br /><br />
            <button>Save</button>
            <button>Cancel</button>
        </div>
    )
}