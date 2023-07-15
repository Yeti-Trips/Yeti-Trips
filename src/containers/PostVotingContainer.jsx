import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { popupClose } from "../reducers/tripsReducers";
import AiVacationResult from "../components/aiVacationResult.jsx";

const PostVotingContainer = (props) => {
    const dispatch = useDispatch()
    const { tripList } = useSelector(state => state.trip);
    const vacationSelection = tripList[props.tripId].voting.final;

    return (
        <div className="PostVotingContainer">; 
            <h1>After voting, the final vacation selection was:</h1>
                <AiVacationResult name={vacationSelection.name} price={vacationSelection.price} type ={vacationSelection.type} image={vacationSelection.image}></AiVacationResult>
                <h3>Start of trip: {tripList[props.tripId].startDate}</h3>
            <button onClick={() => {dispatch(popupClose(tripId))}}>Close</button>
        </div>
    )   
};
export default PostVotingContainer;