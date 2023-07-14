import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    password: "",
    avatarUrl: ""
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