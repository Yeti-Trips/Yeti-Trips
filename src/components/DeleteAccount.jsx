import React from "react";

export default function DeleteAccount(props) {
    return (props.trigger) ? (
        <div>
            <div>
                <p>Are you sure you want to delete your account? Click delete button to delete account.</p>
                <button>Delete</button>
                <button>Cancel</button>
                { props.children }
                <br /> <br />
            </div>
        </div>
    ) : "";
}