import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idCount: 0,
    username: undefined,
    password: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: setUserIdFn,
  }
});

// reducers
function setUserIdFn(state, action) {
  state.userName = action.payload
}


export const { setUserId } = userSlice.actions;
export default userSlice.reducer;