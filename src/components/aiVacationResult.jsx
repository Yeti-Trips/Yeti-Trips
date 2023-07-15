import React from "react";

const AiVacationResult = (props) => {
    return (
        <div className="AiVacationResult">
            <h3>Trip Location: {props.name}</h3>
            <h3>Esimated cost: {props.price}</h3>
            <h3>Vacation Type: {props.type}</h3>
        </div>
    )   
};
export default AiVacationResult;