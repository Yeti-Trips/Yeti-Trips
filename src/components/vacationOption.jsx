import React from "react";
import VacationPopupContainer from "../containers/VacationPopupContainer.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { popupSwap } from "../reducers/tripsReducers";

const VacationOption = (props) => {
    const dispatch = useDispatch();
    let trigger = useSelector(state => state.trip.tripList[props.tripId].popup);
    const currDate = new Date().getTime();
    const quizDeadline = props.quizDeadline;
    const voteDeadline = props.voteDeadline;
    const id = props.tripId;
    let status = undefined;

    if (currDate <= quizDeadline){
        status = "quiz"
        return (
            <div className="VacationOption">
                <h3>Trip Name: {props.tripName}</h3>
                <h4>Status: awaiting Quiz Deadline</h4>
                <h5>Current Deadline: {quizDeadline}</h5>
                <button onClick = {()=> dispatch(popupSwap(props.tripId))}>View</button>
                <VacationPopupContainer trigger = {trigger} status = {status} tripId = {id}></VacationPopupContainer>
            </div>
        )   
    } else if ( currDate > quizDeadline && currDate <= voteDeadline){
        status = "vote"
        return (
            <div className="VacationOption">
                <h3>Trip Name: {props.tripName}</h3>
                <h4>Status: awaiting Vote Deadline</h4>
                <h5>Current Deadline: {voteDeadline}</h5>
                <button onClick = {()=> dispatch(popupSwap(props.tripId))}>View</button>
                <VacationPopupContainer trigger = {trigger} status = {status} tripId = {id}></VacationPopupContainer>
            </div>
        )   
    } else {
        status = "done" 
        return (
            <div className="VacationOption">
                <h3>Trip Name: {props.tripName}</h3>
                <h4>Status: Vacation Selected!</h4>
                <button onClick = {()=> dispatch(popupSwap(props.tripId))}>View</button>
                <VacationPopupContainer trigger = {trigger} status = {status} tripId = {id}></VacationPopupContainer>
            </div>
        )   
    }
};

export default VacationOption;