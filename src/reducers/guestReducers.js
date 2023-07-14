import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    index : 1,
    questionOne: 1,
    questionTwo: 1,
    questionThree: 1,
    createVacationTrue: false,
    joinVacationTrue: false,
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    addGuest: addGuestFn,
    removeGuest: removeGuestFn,
    addQuest: addQuestFn,
    removeQuest: removeQuestFn,
    GroupVacationPopup: GroupVacationPopupFn,
    JoinVacationPopup: JoinVacationPopupFn,
  }
});

// reducers
function addGuestFn(state) {
  if (state.index < 5){
    state.index ++
  }
}

function removeGuestFn(state) {
    if(state.index > 1){
        state.index --
    }
}

function addQuestFn(state, action) {
  const questionNumber = action.payload;
  if (state[questionNumber] < 4){
    state[questionNumber] ++
  }

}

function removeQuestFn(state, action) {
  const questionNumber = action.payload;
  if (state[questionNumber] > 1){
    state[questionNumber] --
  }

}

function GroupVacationPopupFn(state) {
  if (state.createVacationTrue === false){
    state.createVacationTrue = true
  } else {
    state.createVacationTrue = false
  } 
}

function JoinVacationPopupFn(state) {
  if (state.joinVacationTrue === false){
    state.joinVacationTrue = true
  } else {
    state.joinVacationTrue = false
  } 
}

export const { addGuest, removeGuest, addQuest, removeQuest, GroupVacationPopup, JoinVacationPopup} = guestSlice.actions;
export default guestSlice.reducer;