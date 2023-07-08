import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    // vacation: vacationReducer,
  }
});

export default store;