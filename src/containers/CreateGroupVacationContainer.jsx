import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addGuest, removeGuest, addQuest, removeQuest, GroupVacationPopup } from '../reducers/guestReducers.js';
import GuestInput from '../components/guestInput.jsx';
import QuestionInput from '../components/questionInput.jsx';
import '../styles/GroupVacationContainer.css';
// import { useCookies } from "react-cookie";


const CreateGroupVacationContainer = (props) => {
    const dispatch = useDispatch()
    const {index, questionOne, questionTwo, questionThree} = useSelector(state => state.guest)
    const user = useSelector(state => state.user.name);

    const generateVacationFetch = (userName) => {
        const user = userName;
        const tripName = document.querySelector('#tripName').value;
        const startDate = document.querySelector('#startDate').value;
        const endDate = document.querySelector('#endDate').value;
        const guestList = document.querySelectorAll('#guestEmail');
        const guestListArray = [];
        Array.from(guestList).forEach(el => guestListArray.push(el.value));
        const questionOneList = document.querySelectorAll('#one');
        const questionOneAnswers = [];
        const questionOneObject = {1: questionOneAnswers};
        Array.from(questionOneList).forEach(el => questionOneAnswers.push(el.value));
        const questionTwoList = document.querySelectorAll('#two');
        const questionTwoAnswers = [];
        const questionTwoObject = {2: questionTwoAnswers};
        Array.from(questionTwoList).forEach(el => questionTwoAnswers.push(el.value));
        const questionThreeList = document.querySelectorAll('#three');
        const questionThreeAnswers = [];
        const questionThreeObject = {3: questionThreeAnswers};
        Array.from(questionThreeList).forEach(el => questionThreeAnswers.push(el.value));
        const quizDeadline = document.querySelector('#quizDeadLine').value;
        const voteDeadline = document.querySelector('#voteDeadline').value;

        const data = {
            user,
            tripName,
            startDate,
            endDate,
            guestListArray,
            questionOneObject,
            questionTwoObject,
            questionThreeObject,
            quizDeadline,
            voteDeadline
        }

        console.log('data in the frontend', data)

        fetch('http://localhost:3000/server/generate',{
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
    }

    const guest = [];
    for (let x = 0; x < index; x++){
        guest.push(<GuestInput></GuestInput>)
    }
    const questOne = [];
    for (let x = 0; x < questionOne; x++){
        questOne.push(<QuestionInput number= {"one"} count={x}></QuestionInput>)
    }
    const questTwo = [];
    for (let x = 0; x < questionTwo; x++){
        questTwo.push(<QuestionInput number = {"two"} count={x}></QuestionInput>)
    }
    const questThree = [];
    for (let x = 0; x < questionThree; x++){
        questThree.push(<QuestionInput number = {"three"}count={x}></QuestionInput>)
    }
    
return (props.trigger) ? (   
    <div className="popup">
        <div className="popup-inner">
            <label for="tripName"><h1>Trip Name</h1></label>
            <input type="text" id="tripName" name="tripName"></input>
            <br></br>
            <h1>Date of Trip</h1>
            <br></br>
            <span>
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate"></input>
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate"></input>
            </span>
            <br></br>
            <h1>Guest List:</h1>
            <br></br>
            {guest}
            <span>
                <button onClick={()=> dispatch(addGuest())}> Add Guest </button>
                <button onClick={() => dispatch(removeGuest())}> Remove Guest </button>
            </span>
            <h1>Question List:</h1>
            <h2>Question 1: Where do you want to go?</h2>
            {questOne}
            <span>
                <button onClick={()=> dispatch(addQuest('questionOne'))}> Add Option </button>
                <button onClick={() => dispatch(removeQuest('questionOne'))}> Remove Option </button>
            </span>
            <h2>Question 2: What kind of trip do you want to have?</h2>
            {questTwo}
            <span>
                <button onClick={()=> dispatch(addQuest('questionTwo'))}> Add Option </button>
                <button onClick={() => dispatch(removeQuest('questionTwo'))}> Remove Option </button>
            </span>
            <h2>Question 3: How much are you looking to spend?</h2>
            {questThree}
            <span>
                <button onClick={()=> dispatch(addQuest('questionThree'))}> Add Option </button>
                <button onClick={() => dispatch(removeQuest('questionThree'))}> Remove Option </button>
            </span>
            <br></br>
            <span>
                <label for="quizDeadLine">Quiz Deadline:</label>
                <input type="date" id="quizDeadLine" name="quizDeadLine"></input>
                <label for="voteDeadline">Vote Deadline:</label>
                <input type="date" id="voteDeadline" name="voteDeadline"></input>
            </span>
            <br></br>
            <button onClick={() => {dispatch(GroupVacationPopup())
                generateVacationFetch(user)}}>
                Generate Vacation
            </button>
            <button onClick={() => {dispatch(GroupVacationPopup())}}>
                Cancel
            </button>
            
        </div>
    </div>
): "";
}
export default CreateGroupVacationContainer;