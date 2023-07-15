import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import VacationOption from "../components/vacationOption.jsx";
import { useGetVacationListByNameQuery } from '../reducers/apiReducer.js'
import { populateTripList } from '../reducers/tripsReducers.js';

const VacationContainer = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetVacationListByNameQuery();
    
    useEffect(() => {
        dispatch(populateTripList(data))
    }, [data])

    const {tripList} = useSelector(state => state.trip)

    const tripArray = [];
    let id = 0;
    tripList.forEach(trip => {
        tripArray.push(<VacationOption tripId = {id} quizDeadline = {trip.quizDeadline} voteDeadline = {trip.voteDeadline} tripName = {trip.tripName}></VacationOption>)
        id ++
    })

    
    return (  
        <div>
            <h1>Vacations</h1>
            <div className="vacationContainer">
                {tripArray}
            </div>
        </div>
        )
};
export default VacationContainer;