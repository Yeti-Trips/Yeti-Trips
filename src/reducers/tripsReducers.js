import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tripList : [],
    done : false,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    populateTripList: populateTripListFn,
    popupSwap: popupSwapFn,
    quizVotedUpdate: quizVotedUpdateFn,
    aiVacationOptionVotedUpdate: aiVacationOptionVotedUpdateFn,
    popupClose: popupCloseFn
  }
});

// reducers
function populateTripListFn(state, action) {
  if(action.payload && state.done === false){
    state.done = true;
    const trips = action.payload;
    trips.forEach(trip => {
      state.tripList.push(trip)
    })
  } else if (!action.payload) {
    state.tripList = []
  }
}

function popupSwapFn(state, action) {
  state.tripList[action.payload].popup = true
}

function popupCloseFn(state, action) {
  state.tripList[action.payload].popup = false
}

function quizVotedUpdateFn(state, action){

  state.tripList[action.payload[1]].quiz.voted.push(action.payload[0])
}

function aiVacationOptionVotedUpdateFn(state, action){
  state.tripList[action.payload[1]].voting.voted.push(action.payload[0])
}

export const { populateTripList, popupSwap, quizVotedUpdate, aiVacationOptionVotedUpdate, popupClose } = tripSlice.actions;
export default tripSlice.reducer;
