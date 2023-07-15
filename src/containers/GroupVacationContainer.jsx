import React, {useEffect} from "react";
import CreateGroupVacationContainer from './CreateGroupVacationContainer.jsx';
import JoinGroupVacationContainer from './JoinGroupVacationContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { GroupVacationPopup, JoinVacationPopup } from '../reducers/guestReducers.js';
import { useGetAiDataByNameQuery } from '../reducers/apiReducer.js'
import { populateVacationOption } from '../reducers/tripsReducers.js';

const GroupVacationContainer = () => {
    const {createVacationTrue, joinVacationTrue} = useSelector(state => state.guest)
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetAiDataByNameQuery();

    useEffect(() => {
        dispatch(populateVacationOption(data))
    }, [data])

    return (  
        <div className="groupVacationContainer">
            <button onClick ={() => dispatch(GroupVacationPopup())}> Create Group Vacation</button>
                <CreateGroupVacationContainer trigger = {createVacationTrue}>
                </CreateGroupVacationContainer>
            <button onClick = {() => dispatch(JoinVacationPopup())}> Join Group Vacation</button>
                <JoinGroupVacationContainer trigger = {joinVacationTrue}>
                </JoinGroupVacationContainer>
        </div>
    )
};
export default GroupVacationContainer;