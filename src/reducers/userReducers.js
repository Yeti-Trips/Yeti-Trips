import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addId: addIdFn,
  }
});

// reducers
function addIdFn(state) {
  state.idCount ++
}

export const { addId } = userSlice.actions;
export default userSlice.reducer;