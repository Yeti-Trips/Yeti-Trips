import React from "react";

const QuestionOption = (props) => {
    
    return (
        <option value = {props.option}>
            {props.option}
        </option>
    )   
};
export default QuestionOption;