import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth.js'
import sidebarReducer from './sidebar.js';

const allReducers = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer
});

export default allReducers;