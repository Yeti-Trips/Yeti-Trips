import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import AiVacationResult from "../components/aiVacationResult.jsx";
import { popupClose, aiVacationOptionVotedUpdate } from "../reducers/tripsReducers.js";

const VotingContainer = (props) => {
    const dispatch = useDispatch();
    const { tripList } = useSelector(state => state.trip);
    const user = useSelector(state => state.user.name);
    const voted = (!tripList[props.tripId].voting.voted.includes(user))
    const vacationOptions = tripList[props.tripId].voting.options;
    const vacationOptionsComponents = vacationOptions.map(option => {
        <AiVacationResult name={option.name} price={option.price} type ={option.type} image={option.image}></AiVacationResult>
    }) 

    const vacationOptionVoteFetch = (user) => {
        const questionVote = document.querySelector('#vacationSelection').value;
        const data = {
            user,
            questionVote,
        };
        fetch('http://localhost:3000/server/vacationVote',{
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
    }

    return(voted) ?(
 
        <div>
            <h1>Trip Options</h1>
            <div className="vacationContainer">
                {vacationOptionsComponents}
            </div>
            <label for="vacationSelection">Which vacation option do you perfer?</label>
                <select name="vacationSelection" id="vacationSelection">
                    <option value = {vacationOptions[0].name}>{vacationOptions[0].name}</option>
                    <option value = {vacationOptions[1].name}>{vacationOptions[1].name}</option>
                    <option value = {vacationOptions[2].name}>{vacationOptions[2].name}</option>
                </select>
                <button onClick={() => {dispatch(popupClose(props.tripId))
                dispatch(aiVacationOptionVotedUpdate([user,props.tripId]))
                vacationOptionVoteFetch(user)}}>
                Vote
            </button>
            <button onClick={() => {dispatch(popupClose(props.tripId))}}>
                    Cancel
            </button>
        </div>
    ): 
    <div>
        <h1>Awaiting Voting Deadline of {tripList[props.tripId].voteDeadline}</h1>
        <button onClick={() => {dispatch(popupClose(props.tripId))}}>Close</button>
    </div>
   
};
export default VotingContainer;