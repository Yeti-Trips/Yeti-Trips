import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tripList : [],
    done : false,
    doneTwo: false,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    populateTripList: populateTripListFn,
    popupSwap: popupSwapFn,
    quizVotedUpdate: quizVotedUpdateFn,
    aiVacationOptionVotedUpdate: aiVacationOptionVotedUpdateFn,
    popupClose: popupCloseFn,
    populateVacationOption: populateVacationOptionFn,
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

function populateVacationOptionFn(state, action) {
  if(action.payload && state.doneTwo === false){
    state.doneTwo = true;
    const options = action.payload;
    const optionList = JSON.parse(options.content);
    console.log(optionList)

    for (let x = 0; x < 3; x++){
      state.tripList[0].voting.options.push(optionList[x])
    }
    for (let x = 3; x < 6; x++){
      state.tripList[1].voting.options.push(optionList[x])
    }
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

export const { populateTripList, popupSwap, quizVotedUpdate, aiVacationOptionVotedUpdate, popupClose, populateVacationOption } = tripSlice.actions;
export default tripSlice.reducer;
