// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,  // Auth state will be handled by the authReducer
    },
});
