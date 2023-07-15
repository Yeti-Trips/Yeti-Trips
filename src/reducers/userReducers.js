import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idCount: 0,
    email: 'test@email.com',
    password: 'Pass,123!',
    avatar: '../assets/imgs/yeti.jpeg',
    isChangeEmail: false,
    isChangePassword: false,
    isChangeAvatar: false,
    isDeleteAccount: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addId: addIdFn,
    changeEmailPopup: changeEmailPopupFn,
    changePasswordPopup: changePasswordPopupFn,
    changeAvatarPopup: changeAvatarPopupFn,
    deleteAccountPopup: deleteAccountPopupFn
  }
});

// reducers
function addIdFn(state) {
  state.idCount ++
}

function changeEmailPopupFn(state) {
  if (state.isChangeEmail === false) state.isChangeEmail = true;
  else state.isChangeEmail = false;
}

function changePasswordPopupFn(state) {
  if (state.isChangePassword === false) state.isChangePassword = true;
  else state.isChangePassword = false;
}

function changeAvatarPopupFn(state) {
  if (state.isChangeAvatar === false) state.isChangeAvatar = true;
  else state.isChangeAvatar = false;
}

function deleteAccountPopupFn(state) {
  if (state.isDeleteAccount === false) state.isDeleteAccount = true;
  else state.isDeleteAccount = false;
}

export const { addId, changeEmailPopup, changePasswordPopup, changeAvatarPopup, deleteAccountPopup } = userSlice.actions;
export default userSlice.reducer;