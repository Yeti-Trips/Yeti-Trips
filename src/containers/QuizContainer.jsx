import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import QuestionOption from "../components/quizOption.jsx";
import { popupSwap, popupClose, quizVotedUpdate } from "../reducers/tripsReducers";

const QuizContainer = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.name);
    const tripsArray = useSelector(state => state.trip.tripList);

    const voted = (!tripsArray[props.tripId].quiz.voted.includes(user))

    const questionOneOptions = tripsArray[props.tripId].quiz.questionOneObject['1'];

    const questionOneArray = []

    questionOneOptions.forEach(option => {
        questionOneArray.push(<QuestionOption option = {option}></QuestionOption>)
    })
    const questionTwoOptions = tripsArray[props.tripId].quiz.questionTwoObject['2'];

    const questionTwoArray = [];
    questionTwoOptions.forEach(option => {
        questionTwoArray.push(<QuestionOption option = {option}></QuestionOption>)
    })

    const questionThreeOptions = tripsArray[props.tripId].quiz.questionThreeObject['3'];
    const questionThreeArray = [];
    questionThreeOptions.forEach(option => {
        questionThreeArray.push(<QuestionOption option = {option}></QuestionOption>)
    })

    const quizVoteFetch = (user) => {

        const questionOneVote = document.querySelector('#question1').value;
        const questionTwoVote = document.querySelector('#question2').value;
        const questionThreeVote = document.querySelector('#question3').value;

        const data = {
            user,
            questionOneVote,
            questionTwoVote,
            questionThreeVote,
        }
        
        fetch('http://localhost:3000/server/quizVote',{
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
    }
    if ((voted && tripsArray[props.tripId].popup === true)){
        return(
            <div className="QuizContainer">
                <label for="question1">Question 1: Where do you want to go?</label>
                    <select name="question1" id="question1">
                        {questionOneArray}
                    </select>
                <br></br>
                <label for="question2">Question 2: What kind of trip do you want to have?</label>
                    <select name="question2" id="question2">
                        {questionTwoArray}
                    </select>
                <br></br>    
                <label for="question3">Question 3: How much are you looking to spend?</label>
                    <select name="question3" id="question3">
                        {questionThreeArray}
                    </select>
                <br></br>
                <button onClick={() => {dispatch(popupClose(props.tripId))
                    dispatch(quizVotedUpdate([user,props.tripId]))
                    quizVoteFetch(user)}}>
                    Vote
                </button>
                <button onClick={() => {dispatch(popupClose(props.tripId))}}>
                    Cancel
                </button>
            </div>)
    }
     else if (tripsArray[props.tripId].popup === true){
        return (
            <div>
                <h1>Awaiting Quiz Deadline of {tripsArray[props.tripId].quizDeadline}</h1>
                <button onClick={() => {
                    dispatch(popupClose(props.tripId))}}>Close</button>
            </div>
        )
    }
    };
export default QuizContainer;