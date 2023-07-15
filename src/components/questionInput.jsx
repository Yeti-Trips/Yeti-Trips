import React from "react";

const QuestionInput = (props) => {
    return (
        <div className="questionInput">
            <label for="questionOption">Option {props.count + 1}</label>
            <input type="text" id={props.number} name="questionOption"></input>
        </div>
    )   
};
export default QuestionInput;