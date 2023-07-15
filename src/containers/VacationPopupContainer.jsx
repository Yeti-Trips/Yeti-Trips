import React from "react";
import QuizContainer from "./QuizContainer.jsx";
import VotingContainer from "./votingContainer.jsx";
import PostVotingContainer from "./PostVotingContainer.jsx";
import { useSelector } from 'react-redux';

const VacationPopupContainer = (props) => {
    const status = props.status;
    const tripId = props.tripId
    const {tripList} = useSelector(state => state.trip)


    if (status === 'quiz' && tripList[tripId].popup === true){
        return (
            <div className="popup">
                <div className="popup-inner">
                    <QuizContainer tripId = {tripId}/>
                </div>
            </div>
        )   
    } else if (status === 'vote' && tripList[tripId].popup === true){
        return (
            <div className="popup">
                <div className="popup-inner">
                    <VotingContainer tripId = {tripId}/>
                </div>
            </div>

        )   
    } else if (status === 'done' && tripList[tripId].popup === true) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <PostVotingContainer tripId = {tripId}/>
                </div>
            </div>
        )   
    } else {
        return ""
    }
};

export default VacationPopupContainer;