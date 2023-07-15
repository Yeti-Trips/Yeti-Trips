import React from "react";

const GuestInput = (props) => {
    return (
        <div className="guestInput">
            <label for="guestEmail">Email Address:</label>
            <input type="text" id="guestEmail" name="guestEmail"></input>
        </div>
    )   
};
export default GuestInput;