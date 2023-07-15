import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import guestReducer from './reducers/guestReducers';
import tripReducer from './reducers/tripsReducers';
import { serverApi } from './reducers/apiReducer.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    guest: guestReducer,
    trip: tripReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware)
});

export default store;